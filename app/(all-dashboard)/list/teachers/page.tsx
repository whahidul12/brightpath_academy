import FormModal from "@/components/microComponents/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/tableComp/Table";
import TableSearch from "@/components/tableComp/TableSearch";
import { role } from "@/constants/data";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { TeacherList } from "@/shared/types/types";
import { prisma } from "@/src";
import { Prisma } from "@/src/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: TeacherList) => {
  return (
    <tr
      key={item.id}
      className="hover:bg-lamaPurpleLight border-b border-gray-200 text-sm even:bg-[oklch(from_var(--primary)_l_c_h/0.05)]"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img || "/icons/noAvatar.png"}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover md:hidden xl:block"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">
        {item.subjects.map((subject) => subject.name).join(",")}
      </td>
      <td className="hidden md:table-cell">
        {item.classes.map((cls) => cls.name).join(",")}
      </td>
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <Link href={`/list/teachers/${item.id}`}>
                <button className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg p-2">
                  <Image src="/icons/info.png" alt="" width={20} height={20} />
                </button>
              </Link>
              {/*<Link href={`/list/teacher/${item.id}`}>
              <button className="bg-secondary flex h-8 w-8 items-center justify-center rounded-lg p-2">
                <Image src="/icons/delete.png" alt="" width={20} height={20} />
              </button>
              </Link>*/}
              {/*<FormModal table="teacher" type="update" id={item.id} />*/}
              <FormModal table="teacher" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

const TeacherListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, ...searchQueries } = await searchParams;
  const currentPage = page ? parseInt(page) : 1;

  // URL param Rules=============================
  const queryParams: Prisma.TeacherWhereInput = {};
  if (searchQueries) {
    for (const [key, value] of Object.entries(searchQueries)) {
      if (value != undefined) {
        switch (key) {
          case "classId":
            queryParams.lessons = {
              some: { classId: parseInt(value) },
            };
            break;
          case "search":
            queryParams.name = {
              contains: value,
              mode: "insensitive",
            };
            break;
          default:
            break;
        }
      }
    }
  }

  const [TeacherData, count] = await prisma.$transaction([
    prisma.teacher.findMany({
      where: queryParams,
      include: {
        subjects: true,
        classes: true,
      },
      take: ITEM_PER_PAGE,
      skip: (currentPage - 1) * ITEM_PER_PAGE,
    }),
    prisma.teacher.count({
      where: queryParams,
    }),
  ]);

  return (
    <div className="bg-card m-4 mt-0 flex-1 rounded-md p-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold md:block">All Teachers</h1>
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
              //   <Image src="/icons/create.png" alt="" width={20} height={20} />
              // </button>
              <FormModal table="teacher" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={TeacherData} />
      {/* PAGINATION */}
      <Pagination currentPage={currentPage} count={count} />
    </div>
  );
};

export default TeacherListPage;
