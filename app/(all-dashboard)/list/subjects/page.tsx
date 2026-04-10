import FormModal from "@/components/microComponents/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/tableComp/Table";
import TableSearch from "@/components/tableComp/TableSearch";
import { role, subjectsData } from "@/constants/data";
import { Subject } from "@/shared/types/types";
import Image from "next/image";

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
  {
    header: "Actions",
    accessor: "action",
  },
];

const SubjectsListPage = () => {
  const renderRow = (item: Subject) => (
    <tr
      key={item.id}
      className="hover:bg-lamaPurpleLight border-b border-gray-200 text-sm even:bg-[oklch(from_var(--primary)_l_c_h/0.05)]"
    >
      <td className="flex items-center gap-4 p-4 font-semibold">{item.name}</td>
      <td className="hidden md:table-cell">{item.teachers.join(",")}</td>
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
      <Table columns={columns} renderRow={renderRow} data={subjectsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default SubjectsListPage;
