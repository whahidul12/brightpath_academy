import { CardType } from "@/shared/types/types";
import FormModal from "../microComponents/FormModal";
import { prisma } from "@/lib/prisma";

export default async function FormContainer({
  table,
  type,
  data,
  id,
}: {
  table: CardType;
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
}) {
  let relatedData = {};

  if (type !== "delete") {
    try {
      switch (table) {
        case "subject":
          const subjectTeachers = await prisma.teacher.findMany({
            select: { id: true, name: true, surname: true },
          });
          relatedData = { teacher: subjectTeachers };
          break;
        case "class":
          const classGrades = await prisma.grade.findMany({
            select: { id: true, level: true },
          });
          const classTeachers = await prisma.teacher.findMany({
            select: { id: true, name: true, surname: true },
          });
          relatedData = { grades: classGrades, teachers: classTeachers };
          break;
        case "teacher":
          const teacherSubjects = await prisma.subject.findMany({
            select: { id: true, name: true },
          });
          relatedData = { subjects: teacherSubjects };
          break;
        case "student":
          const studentParents = await prisma.parent.findMany({
            select: { id: true, name: true, surname: true },
          });
          const studentGrades = await prisma.grade.findMany({
            select: { id: true, level: true },
          });
          const studentClasses = await prisma.class.findMany({
            select: { id: true, name: true },
          });
          relatedData = {
            parents: studentParents,
            grades: studentGrades,
            classes: studentClasses,
          };
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error fetching related data:", error);
      // Return empty relatedData on error
      relatedData = {};
    }
  }

  return (
    <FormModal
      table={table}
      type={type}
      data={data}
      id={id}
      relatedData={relatedData}
    />
  );
}
