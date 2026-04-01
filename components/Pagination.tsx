import Image from "next/image";

const Pagination = () => {
  return (
    <div className="flex items-center justify-center p-4 text-gray-500">
      <button
        disabled
        className="rounded-md bg-slate-200 px-4 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Image src="/icons/left.png" alt="left-icon" width={14} height={14} />
      </button>
      <div className="flex items-center gap-2 text-sm">
        <button className="bg-lamaSky rounded-sm px-2">1</button>
        <button className="rounded-sm px-2">2</button>
        <button className="rounded-sm px-2">3</button>
        ...
        <button className="rounded-sm px-2">10</button>
      </div>
      <button className="rounded-md bg-slate-200 px-4 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50">
        <Image src="/icons/right.png" alt="right-icon" width={14} height={14} />
      </button>
    </div>
  );
};

export default Pagination;
