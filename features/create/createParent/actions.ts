"use server";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "./types";
import { createParentService } from "./services";
import { ParentSchema } from "@/shared/schemas/ParentFormSchema";
import { clerkClient } from "@clerk/nextjs/server";

export const createParent = async (
  currentState: ActionResponse,
  data: ParentSchema,
): Promise<ActionResponse> => {
  try {
    if (!data.password) {
      return { success: false, error: "Password is required for new parents" };
    }

    const client = await clerkClient();
    const user = await client.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      ...(data.email && { emailAddresses: [{ emailAddress: data.email }] }),
      publicMetadata: { role: "parent" },
    });
    await createParentService(data, user.id);

    revalidatePath("/list/parents");

    return { success: true, error: false };
  } catch (error: any) {
    console.error("Error creating parent:", error);

    // Handle Clerk-specific errors
    if (error?.errors && Array.isArray(error.errors)) {
      const clerkError = error.errors[0];
      if (clerkError?.code === "form_password_pwned") {
        return {
          success: false,
          error:
            "Password has been found in a data breach. Please use a stronger, unique password.",
        };
      }
      if (clerkError?.code === "form_identifier_exists") {
        return {
          success: false,
          error:
            "Username or email already exists. Please use a different one.",
        };
      }
      // Return the first Clerk error message
      return {
        success: false,
        error: clerkError?.message || "Failed to create parent",
      };
    }

    return { success: false, error: "Failed to create parent" };
  }
};
