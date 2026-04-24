"use server";

import { SubjectSchema } from "@/shared/schemas/SubjectFormSchema";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "./types";
import { createSubjectService } from "./services";

export const createSubject = async (
  currentState: ActionResponse,
  data: SubjectSchema,
): Promise<ActionResponse> => {
  try {
    await createSubjectService(data);

    revalidatePath("/list/subjects");

    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to create subject" };
  }
};
