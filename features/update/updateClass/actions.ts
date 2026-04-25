"use server";
import { ClassSchema } from "@/shared/schemas/ClassFormSchema";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "./types";
import { updateClassService } from "./services";

export const updateClass = async (
  currentState: ActionResponse,
  data: ClassSchema,
): Promise<ActionResponse> => {
  try {
    await updateClassService(data);

    revalidatePath("/list/classes");

    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to update class" };
  }
};
