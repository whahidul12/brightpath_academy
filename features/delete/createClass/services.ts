import { prisma } from "@/lib/prisma";
import { ClassSchema } from "@/shared/schemas/ClassFormSchema";

export const deleteClassService = async (data: ClassSchema) => {
  return await prisma.class.delete({
    where: { id: data.id },
  });
};
