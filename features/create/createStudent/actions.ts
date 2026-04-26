"use server";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "./types";
import { createStudentService } from "./services";
import { StudentSchema } from "@/shared/schemas/StudentFormSchema";
import { clerkClient } from "@clerk/nextjs/server";

export const createStudent = async (
  currentState: ActionResponse,
  data: StudentSchema,
): Promise<ActionResponse> => {
  try {
    if (!data.password) {
      return { success: false, error: "Password is required for new students" };
    }

    const client = await clerkClient();
    const user = await client.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      publicMetadata: { role: "student" },
    });
    await createStudentService(data, user.id);

    revalidatePath("/list/students");

    return { success: true, error: false };
  } catch (error: any) {
    console.error("Error creating student:", error);

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
        error: clerkError?.message || "Failed to create student",
      };
    }

    return { success: false, error: "Failed to create student" };
  }
};
