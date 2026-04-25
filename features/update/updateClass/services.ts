import { prisma } from "@/lib/prisma";
import { ClassSchema } from "@/shared/schemas/ClassFormSchema";

export const updateClassService = async (data: ClassSchema) => {
  return await prisma.class.update({
    where: { id: data.id },
    data: {},
  });
};
