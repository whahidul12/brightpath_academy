import FormModal from "@/components/microComponents/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/tableComp/Table";
import TableSearch from "@/components/tableComp/TableSearch";
import { role } from "@/constants/data";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { EventList } from "@/shared/types/types";
import { prisma } from "@/src";
import { Prisma } from "@/src/generated/prisma/client";
import Image from "next/image";

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden sm:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
  },
  {
    header: "Start Time",
    accessor: "startTime",
    className: "hidden sm:table-cell",
  },
  {
    header: "End Time",
    accessor: "endTime",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];
const renderRow = (item: EventList) => (
  <tr
    key={item.id}
    className="hover:bg-lamaPurpleLight border-b border-gray-200 text-sm even:bg-[oklch(from_var(--primary)_l_c_h/0.05)]"
  >
    <td className="gap-4 p-4 font-semibold">{item.title}</td>
    <td className="hidden gap-4 p-4 font-semibold sm:table-cell">
      {item.class.name}
    </td>
    <td className="gap-4 p-4 font-semibold">
      {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
        item.startTime,
      )}
    </td>
    <td className="hidden gap-4 p-4 font-semibold sm:table-cell">
      {item.startTime.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}
    </td>
    <td className="hidden gap-4 p-4 font-semibold md:table-cell">
      {item.endTime.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            {/*<Link href={`/list/event/${item.id}`}>
              <button className="bg-secondary flex h-8 w-8 items-center justify-center rounded-lg p-2">
                <Image src="/icons/delete.png" alt="" width={20} height={20} />
              </button>
            </Link>
            <Link href={`/list/event/${item.id}`}>
              <button className="bg-secondary flex h-8 w-8 items-center justify-center rounded-lg p-2">
                <Image src="/icons/delete.png" alt="" width={20} height={20} />
              </button>
              </Link>*/}
            <FormModal table="event" type="update" id={item.id} />
            <FormModal table="event" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);
const EventsListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, ...searchQueries } = await searchParams;
  const currentPage = page ? parseInt(page) : 1;

  // URL param Rules=============================
  const queryParams: Prisma.EventWhereInput = {};
  if (searchQueries) {
    for (const [key, value] of Object.entries(searchQueries)) {
      if (value != undefined) {
        switch (key) {
          case "search":
            queryParams.title = {
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

  const [EventData, count] = await prisma.$transaction([
    prisma.event.findMany({
      where: queryParams,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: (currentPage - 1) * ITEM_PER_PAGE,
    }),
    prisma.event.count({
      where: queryParams,
    }),
  ]);
  return (
    <div className="bg-card m-4 mt-0 flex-1 rounded-md p-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold md:block">All Events</h1>
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
              <FormModal table="event" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      {EventData.length === 0 ? (
        <div className="p-10 text-center text-gray-500">
          No parents found matching &quot;{searchQueries.search}&quot;
        </div>
      ) : (
        <Table columns={columns} renderRow={renderRow} data={EventData} />
      )}
      {/* PAGINATION */}
      {count >= ITEM_PER_PAGE && (
        <Pagination currentPage={currentPage} count={count} />
      )}
    </div>
  );
};

export default EventsListPage;
