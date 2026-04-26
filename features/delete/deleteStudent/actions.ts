"use server";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "./types";
import { deleteStudentService } from "./services";
import { clerkClient } from "@clerk/nextjs/server";

export const deleteStudent = async (
  currentState: ActionResponse,
  id: string | number,
): Promise<ActionResponse> => {
  const studentId = String(id);

  try {
    // Delete Clerk user first
    const client = await clerkClient();
    await client.users.deleteUser(studentId);

    // Delete from database
    await deleteStudentService(studentId);

    revalidatePath("/list/students");

    return { success: true, error: false };
  } catch (error: any) {
    console.error("Error deleting student:", error);

    // If Clerk deletion fails, still try to delete from database
    try {
      await deleteStudentService(studentId);
      revalidatePath("/list/students");
      return { success: true, error: false };
    } catch (dbError) {
      console.error("Error deleting student from database:", dbError);
    }

    return { success: false, error: "Failed to delete student" };
  }
};
