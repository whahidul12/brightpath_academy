"use server";

import { SubjectSchema } from "@/shared/schemas/SubjectFormSchema";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

export const createSubject = async (data: SubjectSchema) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.SubjectName,
      },
    });
    revalidatePath("/list/subjects");
  } catch (error) {
    console.log(error);
  }
};
