import Pagination from "@/components/Pagination";
import TableSearch from "@/components/tableComp/TableSearch";
import { Table } from "lucide-react";
import Image from "next/image";

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
        <Table />
      </div>
      {/*Pagination*/}
      <div>
        <Pagination />
      </div>
    </div>
  );
}
