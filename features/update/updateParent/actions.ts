"use server";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "./types";
import { updateParentService } from "./services";
import { ParentSchema } from "@/shared/schemas/ParentFormSchema";
import { clerkClient } from "@clerk/nextjs/server";

export const updateParent = async (
  currentState: ActionResponse,
  data: ParentSchema,
): Promise<ActionResponse> => {
  try {
    if (!data.id) {
      return { success: false, error: "Parent ID is required" };
    }

    // Update Clerk user
    const client = await clerkClient();
    await client.users.updateUser(data.id, {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      ...(data.email && {
        emailAddresses: [{ emailAddress: data.email }],
      }),
    });

    // Update database
    await updateParentService(data);

    revalidatePath("/list/parents");

    return { success: true, error: false };
  } catch (error: any) {
    console.error("Error updating parent:", error);

    // Handle Clerk-specific errors
    if (error?.errors && Array.isArray(error.errors)) {
      const clerkError = error.errors[0];
      return {
        success: false,
        error: clerkError?.message || "Failed to update parent",
      };
    }

    return { success: false, error: "Failed to update parent" };
  }
};
