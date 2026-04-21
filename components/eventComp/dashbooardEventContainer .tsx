import Image from "next/image";
import { DashboardEvent } from "../microComponents/DashdoardEvent";
import { prisma } from "@/src";

export const DashboardEventContainer = async ({
  dateParam,
}: {
  dateParam: string | undefined;
}) => {
  const date = dateParam ? new Date(dateParam) : new Date();

  // const events = await prisma.event.findMany({
  //   where: {
  //     startTime: {
  //       gte: new Date(date.setHours(0, 0, 0, 0)),
  //       lte: new Date(date.setHours(23, 59, 59, 999)),
  //     },
  //   },
  // });

  // Hardcoded events to test the UI
  const events = [
    {
      id: 1,
      title: "School Trip",
      description: "A fun trip to the local science museum.",
      startTime: new Date(new Date().setHours(10, 0)),
      endTime: new Date(new Date().setHours(12, 0)),
      createdAt: new Date(),
      updatedAt: new Date(),
      classId: null,
    },
    {
      id: 2,
      title: "Math Competition",
      description: "Annual inter-school mathematics challenge.",
      startTime: new Date(new Date().setHours(13, 0)),
      endTime: new Date(new Date().setHours(15, 0)),
      createdAt: new Date(),
      updatedAt: new Date(),
      classId: null,
    },
  ];

  // -----------------------------------------------
  return (
    <div className="border-border/40 bg-card space-y-4 rounded-2xl border p-5 shadow-sm transition-all">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Events</h2>
          <p className="text-muted-foreground text-xs">Upcoming schedule</p>
        </div>

        <button className="rounded-md p-1.5 transition hover:bg-black/5 dark:hover:bg-white/10">
          <Image
            src="/icons/moreDark.png"
            alt="more-icon"
            width={16}
            height={16}
          />
        </button>
      </div>

      {/* Events */}
      <div className="space-y-3">
        {events.map((event) => (
          <DashboardEvent key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};
