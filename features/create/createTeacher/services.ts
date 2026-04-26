import { prisma } from "@/lib/prisma";
import { TeacherSchema } from "@/shared/schemas/TeacherFormSchema";

export const createTeacherService = async (
  data: TeacherSchema,
  userId: string,
) => {
  try {
    return await prisma.teacher.create({
      data: {
        id: userId,
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
          connect:
            data.subject?.map((subId: string) => ({ id: parseInt(subId) })) ||
            [],
        },
      },
    });
  } catch (error) {
    console.error("Error creating teacher:", error);
    throw error;
  }
};
