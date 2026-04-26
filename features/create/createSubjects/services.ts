import { prisma } from "@/lib/prisma";
import { SubjectSchema } from "@/shared/schemas/SubjectFormSchema";

export const createSubjectService = async (data: SubjectSchema) => {
  try {
    return await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });
  } catch (error) {
    console.error("Error creating subject:", error);
    throw error;
  }
};
