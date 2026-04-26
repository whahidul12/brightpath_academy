import { prisma } from "@/lib/prisma";

export const deleteSubjectService = async (id: string | number) => {
  try {
    return await prisma.subject.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    console.error("Error deleting subject:", error);
    throw error;
  }
};
