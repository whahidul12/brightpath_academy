import { prisma } from "@/lib/prisma";
import { StudentSchema } from "@/shared/schemas/StudentFormSchema";

export const updateStudentService = async (data: StudentSchema) => {
  try {
    if (!data.id) {
      throw new Error("Student ID is required for update");
    }

    return await prisma.student.update({
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
        parentId: data.parentId || undefined,
        gradeId: data.gradeId ? parseInt(data.gradeId) : undefined,
        classId: data.classId ? parseInt(data.classId) : undefined,
      },
    });
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};
