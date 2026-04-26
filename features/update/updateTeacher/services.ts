import { prisma } from "@/lib/prisma";
import { TeacherSchema } from "@/shared/schemas/TeacherFormSchema";

export const updateTeacherService = async (data: TeacherSchema) => {
  try {
    return await prisma.teacher.update({
      where: { id: data.id },
      data: {
        username: data.username,
        name: data.firstName,
        surname: data.lastName,
        email: data.email || undefined,
        phone: data.phone || undefined,
        address: data.address || "",
        img: data.image || undefined,
        bloodType: data.bloodGroup,
        sex: data.gender === "male" ? "MALE" : "FEMALE",
        birthday: data.dateOfBirth,
        subjects: {
          set:
            data.subject?.map((subId: string) => ({ id: parseInt(subId) })) ||
            [],
        },
      },
    });
  } catch (error) {
    console.error("Error updating teacher:", error);
    throw error;
  }
};
