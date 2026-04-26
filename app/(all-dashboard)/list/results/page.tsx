import Pagination from "@/components/Pagination";
import Table from "@/components/tableComp/Table";
import TableSearch from "@/components/tableComp/TableSearch";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { ResultList } from "@/shared/types/types";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/src/generated/prisma/client";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import FormContainer from "@/components/forms/FormContainer";

const ResultListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, ...searchQueries } = await searchParams;
  const currentPage = page ? parseInt(page) : 1;

  const { sessionClaims } = await auth();
  const { userId } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const CurrentUserId = userId;

  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Student",
      accessor: "student",
    },
    {
      header: "Score",
      accessor: "score",
      className: "table-cell",
    },
    {
      header: "Teacher",
      accessor: "teacher",
      className: "hidden md:table-cell",
    },
    {
      header: "Class",
      accessor: "class",
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
  const renderRow = (item: ResultList) => (
    <tr
      key={item.id}
      className="hover:bg-lamaPurpleLight border-b border-gray-200 text-sm even:bg-[oklch(from_var(--primary)_l_c_h/0.05)]"
    >
      <td className="gap-4 p-4 font-semibold">{item.title}</td>
      <td className="gap-4 p-4 font-semibold">
        {item.studentName + " " + item.studentSurname}
      </td>
      <td className="gap-4 p-4 font-semibold">{item.score}</td>
      <td className="hidden gap-4 p-4 font-semibold md:table-cell">
        {item.teacherName + " " + item.teacherSurname}
      </td>
      <td className="hidden gap-4 p-4 font-semibold md:table-cell">
        {item.className}
      </td>
      <td className="hidden gap-4 p-4 font-semibold sm:table-cell">
        {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
          item.startTime,
        )}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {(role === "admin" || role === "teacher") && (
            <>
              {/*<Link href={`/list/result/${item.id}`}>
              <button className="bg-secondary flex h-8 w-8 items-center justify-center rounded-lg p-2">
                <Image src="/icons/delete.png" alt="" width={20} height={20} />
              </button>
            </Link>
            <Link href={`/list/result/${item.id}`}>
              <button className="bg-secondary flex h-8 w-8 items-center justify-center rounded-lg p-2">
                <Image src="/icons/delete.png" alt="" width={20} height={20} />
              </button>
              </Link>*/}
              <FormContainer table="result" type="update" id={item.id} />
              <FormContainer table="result" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  // URL param Rules=============================
  const queryParams: Prisma.ResultWhereInput = {};
  if (searchQueries) {
    for (const [key, value] of Object.entries(searchQueries)) {
      if (value != undefined) {
        switch (key) {
          case "studentId":
            queryParams.studentId = value;
            break;
          case "search":
            queryParams.OR = [
              {
                exam: {
                  title: { contains: value, mode: "insensitive" },
                },
              },
              {
                student: {
                  name: { contains: value, mode: "insensitive" },
                },
              },
            ];
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
      queryParams.OR = [
        { exam: { lesson: { teacherId: CurrentUserId! } } },
        { assignment: { lesson: { teacherId: CurrentUserId! } } },
      ];
      break;
    case "student":
      queryParams.studentId = CurrentUserId!;
      break;
    case "parent":
      queryParams.student = {
        parentId: CurrentUserId!,
      };
      break;
    default:
      break;
  }

  const [ResultData, count] = await prisma.$transaction(async (tx) => {
    const results = await tx.result.findMany({
      where: queryParams,
      include: {
        student: { select: { name: true, surname: true } },
        exam: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (currentPage - 1),
    });
    const total = await tx.result.count({ where: queryParams });
    return [results, total];
  });

  const data = ResultData.map((item) => {
    const assessment = item.exam || item.assignment;
    if (!assessment) return null;
    const isExam = "startTime" in assessment;
    return {
      id: item.id,
      title: assessment.title,
      studentName: item.student.name,
      studentSurname: item.student.surname,
      teacherName: assessment.lesson.teacher.name,
      teacherSurname: assessment.lesson.teacher.surname,
      score: item.score,
      className: assessment.lesson.class.name,
      startTime: isExam ? assessment.startTime : assessment.startDate,
    };
  });
  return (
    <div className="bg-card m-4 mt-0 flex-1 rounded-md p-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold md:block">All Results</h1>
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
              <FormContainer table="result" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      {data.length === 0 ? (
        <div className="p-10 text-center text-gray-500">
          No parents found matching &quot;{searchQueries.search}&quot;
        </div>
      ) : (
        <Table columns={columns} renderRow={renderRow} data={data} />
      )}
      {/* PAGINATION */}
      {count >= ITEM_PER_PAGE && (
        <Pagination currentPage={currentPage} count={count} />
      )}
    </div>
  );
};

export default ResultListPage;
