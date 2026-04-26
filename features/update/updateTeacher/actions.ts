"use server";
import { TeacherSchema } from "@/shared/schemas/TeacherFormSchema";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "./types";
import { updateTeacherService } from "./services";

export const updateTeacher = async (
  currentState: ActionResponse,
  data: TeacherSchema,
): Promise<ActionResponse> => {
  try {
    await updateTeacherService(data);

    revalidatePath("/list/teachers");

    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to update teacher" };
  }
};
