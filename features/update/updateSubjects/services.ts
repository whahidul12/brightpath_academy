import { prisma } from "@/lib/prisma";
import { SubjectSchema } from "@/shared/schemas/SubjectFormSchema";

export const updateSubjectService = async (data: SubjectSchema) => {
  return await prisma.subject.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.SubjectName,
      teachers: {
        set: data.teachers.map((teacherId) => ({ id: teacherId })),
      },
    },
  });
};
