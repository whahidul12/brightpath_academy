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
    <div className="bg-card rounded-lg p-4">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">Events</span>
        <Image
          src="/icons/moreDark.png"
          alt="more-icon"
          width={30}
          height={10}
          className="w-fit"
        />
      </div>
      {events.map((event) => (
        <DashboardEvent key={event._id} {...event} />
      ))}
    </div>
  );
};
