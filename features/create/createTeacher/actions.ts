"use server";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "./types";
import { createTeacherService } from "./services";
import { TeacherSchema } from "@/shared/schemas/TeacherFormSchema";
import { clerkClient } from "@clerk/nextjs/server";

export const createTeacher = async (
  currentState: ActionResponse,
  data: TeacherSchema,
): Promise<ActionResponse> => {
  try {
    if (!data.password) {
      return { success: false, error: "Password is required for new teachers" };
    }

    const client = await clerkClient();
    const user = await client.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      publicMetadata: { role: "teacher" },
    });
    await createTeacherService(data, user.id);

    revalidatePath("/list/teachers");

    return { success: true, error: false };
  } catch (error: any) {
    console.error("Error creating teacher:", error);

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
        error: clerkError?.message || "Failed to create teacher",
      };
    }

    return { success: false, error: "Failed to create teacher" };
  }
};
