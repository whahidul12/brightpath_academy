import Image from "next/image";

export default function TableSearch() {
  return (
    <div className="flex gap-3 rounded-full border border-gray-500 bg-transparent p-2">
      <Image
        src="/icons/search.png"
        alt="search-icon"
        width={20}
        height={20}
        className="w-7"
      />
      <input
        type="text"
        placeholder="Search..."
        className="border-none outline-none"
      />
    </div>
  );
}
