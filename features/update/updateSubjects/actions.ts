"use server";

import { SubjectSchema } from "@/shared/schemas/SubjectFormSchema";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "./types";
import { updateSubjectService } from "./services";

export const updateSubject = async (
  currentState: ActionResponse,
  data: SubjectSchema,
): Promise<ActionResponse> => {
  try {
    await updateSubjectService(data);

    revalidatePath("/list/subjects");

    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to update subject" };
  }
};
