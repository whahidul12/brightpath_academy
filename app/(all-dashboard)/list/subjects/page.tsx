import FormModal from "@/components/microComponents/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/tableComp/Table";
import TableSearch from "@/components/tableComp/TableSearch";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { SubjectList } from "@/shared/types/types";
import { prisma } from "@/src";
import { Prisma } from "@/src/generated/prisma/client";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

const { sessionClaims } = await auth();
const role = (sessionClaims?.metadata as { role?: string })?.role;
const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Teachers",
    accessor: "teachers",
    className: "hidden md:table-cell",
  },
  ...(role === "admin"
    ? [
        {
          header: "Actions",
          accessor: "action",
        },
      ]
    : []),
];
const renderRow = (item: SubjectList) => (
  <tr
    key={item.id}
    className="hover:bg-lamaPurpleLight border-b border-gray-200 text-sm even:bg-[oklch(from_var(--primary)_l_c_h/0.05)]"
  >
    <td className="flex items-center gap-4 p-4 font-semibold">{item.name}</td>
    <td className="hidden md:table-cell">
      {item.teachers.map((teacher) => teacher.name).join(",")}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            {/*<Link href={`/list/student/${item.id}`}>
              <button className="bg-secondary flex h-8 w-8 items-center justify-center rounded-lg p-2">
                <Image src="/icons/delete.png" alt="" width={20} height={20} />
              </button>
            </Link>
            <Link href={`/list/student/${item.id}`}>
              <button className="bg-secondary flex h-8 w-8 items-center justify-center rounded-lg p-2">
                <Image src="/icons/delete.png" alt="" width={20} height={20} />
              </button>
              </Link>*/}
            <FormModal table="student" type="update" id={item.id} />
            <FormModal table="student" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const SubjectsListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, ...searchQueries } = await searchParams;
  const currentPage = page ? parseInt(page) : 1;

  // URL param Rules=============================
  const queryParams: Prisma.SubjectWhereInput = {};
  if (searchQueries) {
    for (const [key, value] of Object.entries(searchQueries)) {
      if (value != undefined) {
        switch (key) {
          case "search":
            queryParams.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [SubjectData, count] = await prisma.$transaction([
    prisma.subject.findMany({
      where: queryParams,
      include: {
        teachers: true,
      },
      take: ITEM_PER_PAGE,
      skip: (currentPage - 1) * ITEM_PER_PAGE,
    }),
    prisma.subject.count({
      where: queryParams,
    }),
  ]);
  return (
    <div className="bg-card m-4 mt-0 flex-1 rounded-md p-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold md:block">All Subjects</h1>
        <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <Image src="/icons/filter.png" alt="" width={20} height={20} />
            </button>
            <button className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <Image src="/icons/sort.png" alt="" width={20} height={20} />
            </button>
            {role === "admin" && (
              // <button className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              //   <Image src="/icons/add.png" alt="" width={20} height={20} />
              // </button>
              <FormModal table="subject" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      {SubjectData.length === 0 ? (
        <div className="p-10 text-center text-gray-500">
          No parents found matching &quot;{searchQueries.search}&quot;
        </div>
      ) : (
        <Table columns={columns} renderRow={renderRow} data={SubjectData} />
      )}
      {/* PAGINATION */}
      {count >= ITEM_PER_PAGE && (
        <Pagination currentPage={currentPage} count={count} />
      )}
    </div>
  );
};

export default SubjectsListPage;
