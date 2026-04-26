import { prisma } from "@/lib/prisma";
import { ParentSchema } from "@/shared/schemas/ParentFormSchema";

export const updateParentService = async (data: ParentSchema) => {
  try {
    if (!data.id) {
      throw new Error("Parent ID is required for update");
    }

    return await prisma.parent.update({
      where: { id: data.id },
      data: {
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
    console.error("Error updating parent:", error);
    throw error;
  }
};
