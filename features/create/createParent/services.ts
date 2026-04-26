import { prisma } from "@/lib/prisma";
import { ParentSchema } from "@/shared/schemas/ParentFormSchema";

export const createParentService = async (
  data: ParentSchema,
  userId: string,
) => {
  try {
    return await prisma.parent.create({
      data: {
        id: userId,
        username: data.username,
        name: data.firstName,
        surname: data.lastName,
        email: data.email || undefined,
        phone: data.phone || undefined,
        address: data.address || "",
        img: data.image || undefined,
      },
    });
  } catch (error) {
    console.error("Error creating parent:", error);
    throw error;
  }
};
