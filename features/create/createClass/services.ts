import { prisma } from "@/lib/prisma";
import { ClassSchema } from "@/shared/schemas/ClassFormSchema";

export const createClassService = async (data: ClassSchema) => {
  return await prisma.class.create({
    data,
  });
};
