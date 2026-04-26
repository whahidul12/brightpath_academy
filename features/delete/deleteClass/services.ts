import { prisma } from "@/lib/prisma";

export const deleteClassService = async (id: string | number) => {
  try {
    const numericId = typeof id === "string" ? parseInt(id, 10) : id;

    if (isNaN(numericId)) {
      throw new Error("Invalid ID provided");
    }

    return await prisma.class.delete({
      where: {
        id: numericId,
      },
    });
  } catch (error) {
    console.error("Error deleting class:", error);
    throw error;
  }
};
