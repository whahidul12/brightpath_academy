import { prisma } from "@/lib/prisma";
import { ClassSchema } from "@/shared/schemas/ClassFormSchema";

export const updateClassService = async (data: ClassSchema) => {
  try {
    return await prisma.class.update({
      where: { id: data.id },
      data: {
        name: data.name,
        capacity: data.capacity,
        gradeId: data.gradeId,
        supervisorId: data.supervisorId || null,
      },
    });
  } catch (error) {
    console.error("Error updating class:", error);
    throw error;
  }
};
