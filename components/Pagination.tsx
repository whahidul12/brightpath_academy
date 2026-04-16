"use client";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Pagination = ({
  currentPage,
  count,
}: {
  currentPage: number;
  count: number;
}) => {
  const router = useRouter();

  const isPreviousDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= Math.ceil(count / ITEM_PER_PAGE);

  const handlePageChange = (pageNo: number) => {
    const parems = new URLSearchParams(window.location.search);
    parems.set("page", pageNo.toString());
    router.push(`${window.location.pathname}?${parems.toString()}`);
  };

  return (
    <div className="flex items-center justify-center p-4 text-gray-500">
      <button
        disabled={isPreviousDisabled}
        className="bg-secondary text-secondary-foreground rounded-lg px-4 py-2.5 text-xs font-semibold hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <Image src="/icons/left.png" alt="left-icon" width={14} height={14} />
      </button>
      <div className="mx-4 flex items-center gap-2 text-sm">
        {Array.from(
          { length: Math.ceil(count / ITEM_PER_PAGE) },
          (_: unknown, index: number) => {
            const pageIndex = index + 1;
            return (
              <button
                key={pageIndex}
                className={`text-primary-foreground rounded-lg px-4 py-2 hover:cursor-pointer ${pageIndex === currentPage ? "bg-primary" : "bg-primary/50"}`}
                onClick={() => handlePageChange(pageIndex)}
              >
                {pageIndex}
              </button>
            );
          },
        )}
      </div>
      <button
        className="bg-secondary text-secondary-foreground rounded-lg px-4 py-2.5 font-semibold hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isNextDisabled}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <Image src="/icons/right.png" alt="right-icon" width={14} height={14} />
      </button>
    </div>
  );
};

export default Pagination;
