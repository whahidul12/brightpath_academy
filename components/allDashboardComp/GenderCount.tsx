import Image from "next/image";
import CountChart from "../charts/CountChart";
import { prisma } from "@/lib/prisma";

export default async function GenderCount() {
  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });

  const boys = data.find((g) => g.sex === "MALE")?._count || 0;
  const girls = data.find((g) => g.sex === "FEMALE")?._count || 0;
  const total = boys + girls;
  return (
    <>
      <div className="border-border/40 bg-card space-y-5 rounded-2xl border p-5 shadow-sm transition-all">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold tracking-tight">Students</h2>
            <p className="text-muted-foreground text-xs">
              Distribution overview
            </p>
          </div>

          <button className="rounded-md p-1.5 transition hover:bg-black/5 dark:hover:bg-white/10">
            <Image
              src="/icons/moreDark.png"
              alt="more"
              width={16}
              height={16}
            />
          </button>
        </div>
        <CountChart boys={boys} girls={girls} total={total} />
        {/* Stats */}
        <div className="flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-primary h-2.5 w-2.5 rounded-full" />
            <div>
              <p className="text-sm font-medium">Boys</p>
              <p className="text-muted-foreground text-xs">
                {boys} ({Math.round((boys / total) * 100)}%)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-secondary h-2.5 w-2.5 rounded-full" />
            <div>
              <p className="text-sm font-medium">Girls</p>
              <p className="text-muted-foreground text-xs">
                {girls} ({Math.round((girls / total) * 100)}%)
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
