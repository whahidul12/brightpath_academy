import { prisma } from "@/lib/prisma";
import { ClassSchema } from "@/shared/schemas/ClassFormSchema";

export const createClassService = async (data: ClassSchema) => {
  try {
    return await prisma.class.create({
      data,
    });
  } catch (error) {
    console.error("Error creating class:", error);
    throw error;
  }
};
