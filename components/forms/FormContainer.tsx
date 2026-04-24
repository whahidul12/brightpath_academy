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
      default:
        break;
    }
  }
  console.log(":::", relatedData);
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
