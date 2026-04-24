import { prisma } from "@/lib/prisma";
import { SubjectSchema } from "@/shared/schemas/SubjectFormSchema";

export const createSubjectService = async (data: SubjectSchema) => {
  return await prisma.subject.create({
    data: {
      name: data.SubjectName,
      teachers: {
        connect: data.teachers.map((teacherId) => ({ id: teacherId })),
      },
    },
  });
};
