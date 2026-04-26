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
        phone: data.phone,
        address: data.address || "",
      },
    });
  } catch (error) {
    console.error("Error creating parent in database:", error);
    throw error;
  }
};
