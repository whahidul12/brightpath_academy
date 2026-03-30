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
    <div className="bg-card rounded-lg p-4">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">Announcements</span>
        <Image
          src="/icons/moreDark.png"
          alt="more-icon"
          width={30}
          height={10}
          className="w-fit"
        />
      </div>
      {announcements.map((announcement) => (
        <DashboardAnnouncement key={announcement._id} {...announcement} />
      ))}
    </div>
  );
};
