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
    switch (table) {
      case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = JSON.parse(JSON.stringify({ teacher: subjectTeachers }));
        break;
      case "class":
        const classGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const classTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = JSON.parse(
          JSON.stringify({ grades: classGrades, teachers: classTeachers }),
        );
        break;
      default:
        break;
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
