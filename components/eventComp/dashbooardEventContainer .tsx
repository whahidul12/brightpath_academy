import Image from "next/image";
import { DashboardEvent } from "../microComponents/DashdoardEvent";

const events = [
  {
    _id: 1,
    tile: "lorem sutunu es",
    time: "12PM - 2PM",
    description:
      "lorem sutunu is pa hait pjsp hatimono jakal lorem sutunu is pa hait pjsp hatimono jakal",
  },
  {
    _id: 2,
    tile: "lorem sutunu es",
    time: "12PM - 2PM",
    description:
      "lorem sutunu is pa hait pjsp hatimono jakal lorem sutunu is pa hait pjsp hatimono jakal",
  },
  {
    _id: 3,
    tile: "lorem sutunu es",
    time: "12PM - 2PM",
    description:
      "lorem sutunu is pa hait pjsp hatimono jakal lorem sutunu is pa hait pjsp hatimono jakal",
  },
];

export const DashboardEventContainer = () => {
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
          <DashboardEvent key={event._id} {...event} />
        ))}
      </div>
    </div>
  );
};
