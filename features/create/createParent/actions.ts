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
  let clerkUserId: string | null = null;

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

    clerkUserId = user.id;

    // Try to create in database
    await createParentService(data, user.id);

    revalidatePath("/list/parents");

    return { success: true, error: false };
  } catch (error: any) {
    console.error("Error creating parent:", error);

    // If we created a Clerk user but database failed, clean up Clerk user
    if (clerkUserId) {
      try {
        const client = await clerkClient();
        await client.users.deleteUser(clerkUserId);
        console.log("Cleaned up Clerk user after database failure");
      } catch (cleanupError) {
        console.error("Failed to cleanup Clerk user:", cleanupError);
      }
    }

    // Handle Clerk-specific errors
    if (error?.errors && Array.isArray(error.errors)) {
      const clerkError = error.errors[0];

      const errorMessage =
        clerkError?.code === "form_password_pwned"
          ? "Password has been found in a data breach. Please use a stronger, unique password."
          : clerkError?.code === "form_identifier_exists"
            ? "Username or email already exists. Please use a different one."
            : clerkError?.message || "Failed to create parent";

      console.log("Returning error:", errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }

    // Handle Prisma unique constraint errors
    if (error?.code === "P2002") {
      const field = error?.meta?.target?.[0] || "field";
      const fieldName =
        field === "phone"
          ? "phone number"
          : field === "email"
            ? "email"
            : field === "username"
              ? "username"
              : field;
      return {
        success: false,
        error: `This ${fieldName} is already in use. Please use a different one.`,
      };
    }

    return { success: false, error: "Failed to create parent" };
  }
};
