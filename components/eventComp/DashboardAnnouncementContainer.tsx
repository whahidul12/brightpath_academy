import Image from "next/image";
import { DashboardAnnouncement } from "../microComponents/DashboardAnnouncement";

const announcements = [
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

export const DashboardAnnouncementContainer = () => {
  return (
    <div className="border-border/40 bg-card space-y-4 rounded-2xl border p-5 shadow-sm transition-all">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Announcements
          </h2>
          <p className="text-muted-foreground text-xs">
            Latest updates & notices
          </p>
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

      {/* List */}
      <div className="space-y-3">
        {announcements.map((announcement) => (
          <DashboardAnnouncement key={announcement._id} {...announcement} />
        ))}
      </div>
    </div>
  );
};
