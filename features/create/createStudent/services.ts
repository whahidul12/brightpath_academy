import { prisma } from "@/lib/prisma";
import { StudentSchema } from "@/shared/schemas/StudentFormSchema";

export const createStudentService = async (
  data: StudentSchema,
  userId: string,
) => {
  try {
    return await prisma.student.create({
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
        parentId: data.parentId || undefined,
        gradeId: data.gradeId ? parseInt(data.gradeId) : undefined,
        classId: data.classId ? parseInt(data.classId) : undefined,
      },
    });
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};
