import { prisma } from "@/lib/prisma";

export const deleteStudentService = async (id: string) => {
  try {
    return await prisma.student.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};
