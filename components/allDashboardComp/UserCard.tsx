import Image from "next/image";

export default function UserCard({ userType }: { userType: string }) {
  return (
    <div className="bg-card min-w-32 flex-1 rounded-2xl border p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* Top Section */}
      <div className="flex items-center justify-between text-xs opacity-60">
        <span>2025/26</span>
        <button className="rounded-md p-1.5 transition hover:bg-black/5 dark:hover:bg-white/10">
          <Image src="/icons/moreDark.png" alt="more" width={16} height={16} />
        </button>
      </div>

      {/* Content */}
      <div className="mt-4 space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">12,345</h1>
        <p className="text-sm font-medium opacity-80">{userType}</p>
      </div>
    </div>
  );
}
