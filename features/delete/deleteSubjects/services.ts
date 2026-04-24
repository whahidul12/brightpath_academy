import { prisma } from "@/lib/prisma";

export const deleteSubjectService = async (id: string | number) => {
  return await prisma.subject.delete({
    where: {
      id: Number(id),
    },
  });
};
