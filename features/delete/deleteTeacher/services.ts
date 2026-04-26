import { prisma } from "@/lib/prisma";

export const deleteTeacherService = async (id: string) => {
  try {
    return await prisma.teacher.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("Error deleting teacher:", error);
    throw error;
  }
};
