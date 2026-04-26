import { prisma } from "@/lib/prisma";
import { SubjectSchema } from "@/shared/schemas/SubjectFormSchema";

export const updateSubjectService = async (data: SubjectSchema) => {
  try {
    return await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });
  } catch (error) {
    console.error("Error updating subject:", error);
    throw error;
  }
};
