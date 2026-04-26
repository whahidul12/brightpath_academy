"use server";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "./types";
import { deleteTeacherService } from "./services";

export const deleteTeacher = async (
  currentState: ActionResponse,
  id: string,
): Promise<ActionResponse> => {
  try {
    await deleteTeacherService(id);

    revalidatePath("/list/teachers");

    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to delete teacher" };
  }
};
