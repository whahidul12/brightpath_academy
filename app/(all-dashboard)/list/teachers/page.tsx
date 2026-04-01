import Pagination from "@/components/Pagination";
import Table from "@/components/tableComp/Table";
import TableRow from "@/components/tableComp/TableRow";
import TableSearch from "@/components/tableComp/TableSearch";
import { teachersData } from "@/constants/data";
import Image from "next/image";

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

export default function TeachersListPage() {
  return (
    <div className="bg-card text-card-foreground m-4 mt-0 flex flex-1 flex-col rounded-lg p-4">
      {/*TOP Navigation*/}
      <div className="flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold md:block">All Teachers</h1>
        <div className="flex w-full flex-col items-center justify-center gap-4 bg-red-100 md:w-fit md:flex-row">
          <TableSearch />
          <div className="flex w-full items-center justify-end gap-4 bg-red-300 md:w-fit">
            <button className="bg-primary rounded-lg p-2">
              <Image
                src="/icons/filter.png"
                alt="filter--icon"
                width={14}
                height={14}
              />
            </button>
            <button className="bg-primary rounded-lg p-2">
              <Image
                src="/icons/sort.png"
                alt="filter--icon"
                width={14}
                height={14}
              />
            </button>
            <button className="bg-primary rounded-lg p-2">
              <Image
                src="/icons/add.png"
                alt="filter--icon"
                width={14}
                height={14}
              />
            </button>
          </div>
        </div>
      </div>
      {/*List Section*/}
      <div>
        <Table
          columns={columns}
          data={teachersData}
          renderRow={(item) => <TableRow key={item.id} {...item} />}
        />
      </div>
      {/*Pagination*/}
      <div>
        <Pagination />
      </div>
    </div>
  );
}
