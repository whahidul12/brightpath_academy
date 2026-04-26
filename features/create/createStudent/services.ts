import { prisma } from "@/lib/prisma";
import { StudentSchema } from "@/shared/schemas/StudentFormSchema";

export const createStudentService = async (
  data: StudentSchema,
  userId: string,
) => {
  try {
    // Validate required fields
    if (!data.parentId) {
      throw new Error("Parent ID is required");
    }
    if (!data.gradeId) {
      throw new Error("Grade ID is required");
    }
    if (!data.classId) {
      throw new Error("Class ID is required");
    }

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
        parentId: data.parentId,
        gradeId: parseInt(data.gradeId),
        classId: parseInt(data.classId),
      },
    });
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};
