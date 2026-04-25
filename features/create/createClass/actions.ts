"use server";
import { ClassSchema } from "@/shared/schemas/ClassFormSchema";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "./types";
import { createClassService } from "./services";

export const createClass = async (
  currentState: ActionResponse,
  data: ClassSchema,
): Promise<ActionResponse> => {
  try {
    await createClassService(data);

    revalidatePath("/list/classes");

    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to create class" };
  }
};
