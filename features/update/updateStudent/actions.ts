"use server";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "./types";
import { updateStudentService } from "./services";
import { StudentSchema } from "@/shared/schemas/StudentFormSchema";
import { clerkClient } from "@clerk/nextjs/server";

export const updateStudent = async (
  currentState: ActionResponse,
  data: StudentSchema,
): Promise<ActionResponse> => {
  try {
    if (!data.id) {
      return { success: false, error: "Student ID is required" };
    }

    // Update Clerk user
    const client = await clerkClient();
    await client.users.updateUser(data.id, {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    // Update database
    await updateStudentService(data);

    revalidatePath("/list/students");

    return { success: true, error: false };
  } catch (error: any) {
    console.error("Error updating student:", error);

    // Handle Clerk-specific errors
    if (error?.errors && Array.isArray(error.errors)) {
      const clerkError = error.errors[0];
      return {
        success: false,
        error: clerkError?.message || "Failed to update student",
      };
    }

    return { success: false, error: "Failed to update student" };
  }
};
