import FormModal from "@/components/microComponents/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/tableComp/Table";
import TableSearch from "@/components/tableComp/TableSearch";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { ExamList } from "@/shared/types/types";
import { prisma } from "@/src";
import { Prisma } from "@/src/generated/prisma/client";
import Image from "next/image";
import { getRole, getCurrentUserId } from "@/lib/helper";

const role = await getRole();
const CurrentUserId = await getCurrentUserId();

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden sm:table-cell",
  },
  ...(role === "admin" || role === "teacher"
    ? [
        {
          header: "Actions",
          accessor: "action",
        },
      ]
    : []),
];
const renderRow = (item: ExamList) => (
  <tr
    key={item.id}
    className="hover:bg-lamaPurpleLight border-b border-gray-200 text-sm even:bg-[oklch(from_var(--primary)_l_c_h/0.05)]"
  >
    <td className="gap-4 p-4 font-semibold">{item.lesson.subject.name}</td>
    <td className="gap-4 p-4 font-semibold">{item.lesson.class.name}</td>
    <td className="hidden gap-4 p-4 font-semibold md:table-cell">
      {item.lesson.teacher.name + " " + item.lesson.teacher.surname}
    </td>
    <td className="hidden gap-4 p-4 font-semibold sm:table-cell">
      {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
        new Date(item.startTime),
      )}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {(role === "admin" || role === "teacher") && (
          <>
            {/*<Link href={`/list/exam/${item.id}`}>
              <button className="bg-secondary flex h-8 w-8 items-center justify-center rounded-lg p-2">
                <Image src="/icons/delete.png" alt="" width={20} height={20} />
              </button>
            </Link>
            <Link href={`/list/exam/${item.id}`}>
              <button className="bg-secondary flex h-8 w-8 items-center justify-center rounded-lg p-2">
                <Image src="/icons/delete.png" alt="" width={20} height={20} />
              </button>
              </Link>*/}
            <FormModal table="exam" type="update" id={item.id} />
            <FormModal table="exam" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const ExamsListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, ...searchQueries } = await searchParams;
  const currentPage = page ? parseInt(page) : 1;

  // URL param Rules=============================
  const queryParams: Prisma.ExamWhereInput = {};
  queryParams.lesson = {};
  if (searchQueries) {
    for (const [key, value] of Object.entries(searchQueries)) {
      if (value != undefined) {
        switch (key) {
          case "classId":
            queryParams.lesson.classId = parseInt(value);
            break;
          case "teacherId":
            queryParams.lesson.teacherId = value;
            break;
          case "search":
            queryParams.lesson.subject = {
              name: { contains: value, mode: "insensitive" },
            };
            break;
          default:
            break;
        }
      }
    }
  }

  //Role-Based Rules==============================
  switch (role) {
    case "admin":
      break;
    case "teacher":
      queryParams.lesson.teacherId = CurrentUserId!;
      break;
    case "student":
      queryParams.lesson.class = { students: { some: { id: CurrentUserId! } } };
      break;
    case "parent":
      queryParams.lesson.class = {
        students: { some: { parentId: CurrentUserId! } },
      };
      break;
    default:
      break;
  }

  const [ExamData, count] = await prisma.$transaction([
    prisma.exam.findMany({
      where: queryParams,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            class: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: (currentPage - 1) * ITEM_PER_PAGE,
    }),
    prisma.exam.count({
      where: queryParams,
    }),
  ]);
  return (
    <div className="bg-card m-4 mt-0 flex-1 rounded-md p-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold md:block">All Exams</h1>
        <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <Image src="/icons/filter.png" alt="" width={20} height={20} />
            </button>
            <button className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <Image src="/icons/sort.png" alt="" width={20} height={20} />
            </button>
            {(role === "admin" || role === "teacher") && (
              // <button className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              //   <Image src="/icons/add.png" alt="" width={20} height={20} />
              // </button>
              <FormModal table="exam" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      {ExamData.length === 0 ? (
        <div className="p-10 text-center text-gray-500">
          No parents found matching &quot;{searchQueries.search}&quot;
        </div>
      ) : (
        <Table columns={columns} renderRow={renderRow} data={ExamData} />
      )}
      {/* PAGINATION */}
      {count >= ITEM_PER_PAGE && (
        <Pagination currentPage={currentPage} count={count} />
      )}
    </div>
  );
};

export default ExamsListPage;
