"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function TableSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const value = formData.get("search") as string;

    const params = new URLSearchParams(searchParams.toString());
    params.set("search", value);

    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <form
      onSubmit={handleSearch}
      className="flex gap-3 rounded-full border border-gray-500 bg-transparent p-2"
    >
      <Image
        src="/icons/search.png"
        alt="search-icon"
        width={20}
        height={20}
        className="w-7"
      />
      <input
        name="search"
        type="text"
        placeholder="Search..."
        className="border-none outline-none"
      />
    </form>
  );
}
