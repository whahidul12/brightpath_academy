import { prisma } from "@/lib/prisma";

export const deleteParentService = async (id: string) => {
  try {
    return await prisma.parent.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting parent:", error);
    throw error;
  }
};
