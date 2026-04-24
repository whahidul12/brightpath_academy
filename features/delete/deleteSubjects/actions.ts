"use server";

import { revalidatePath } from "next/cache";
import { deleteSubjectService } from "./services";
import { ActionResponse } from "./types";

export const deleteSubject = async (
  currentState: ActionResponse,
  id: string | number,
): Promise<ActionResponse> => {
  try {
    await deleteSubjectService(id);

    revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to delete subject. It might be linked to other records.",
    };
  }
};
