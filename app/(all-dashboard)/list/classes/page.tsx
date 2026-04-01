import Pagination from "@/components/Pagination";
import Table from "@/components/tableComp/Table";
import TableSearch from "@/components/tableComp/TableSearch";
import { classesData, role } from "@/constants/data";
import { Class } from "@/shared/types/types";
import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    header: "Class Name",
    accessor: "name",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "table-cell",
  },
  {
    header: "Supervisor",
    accessor: "supervisor",
    className: "hidden sm:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const SubjectsListPage = () => {
  const renderRow = (item: Class) => (
    <tr
      key={item.id}
      className="hover:bg-lamaPurpleLight border-b border-gray-200 text-sm even:bg-[oklch(from_var(--primary)_l_c_h/0.05)]"
    >
      <td className="flex items-center gap-4 p-4 font-semibold">{item.name}</td>
      <td className="hidden md:table-cell">{item.capacity}</td>
      <td className="table-cell">{item.grade}</td>
      <td className="hidden sm:table-cell">{item.supervisor}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg p-2">
              <Image src="/icons/edit.png" alt="" width={20} height={20} />
            </button>
          </Link>
          {role === "admin" && (
            <button className="bg-secondary flex h-8 w-8 items-center justify-center rounded-lg p-2">
              <Image src="/icons/bin.png" alt="" width={20} height={20} />
            </button>
            // <FormModal table="student" type="delete" id={item.id}/>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-card m-4 mt-0 flex-1 rounded-md p-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold md:block">All Classes</h1>
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
              <button className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <Image src="/icons/add.png" alt="" width={20} height={20} />
              </button>
              // <FormModal table="teacher" type="create"/>
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={classesData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default SubjectsListPage;
