import { BigCalendar } from "@/components/calendars/BigCalendar";
import { EventCalendar } from "@/components/calendars/EventCalendar";
import { DashboardAnnouncementContainer } from "@/components/eventComp/DashboardAnnouncementContainer";
import { DashboardEventContainer } from "@/components/eventComp/dashbooardEventContainer ";
import Image from "next/image";

export default function StudentsPage() {
  return (
    <div className="flex flex-col justify-between gap-4 p-4 xl:flex-row">
      {/*Left Side DashBoard Panel*/}
      <div className="bg-card text-card-foreground flex w-full flex-col gap-4 rounded-lg p-4 pt-0 xl:w-2/3">
        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Schedule</h1>
          <Image
            src="/icons/moreDark.png"
            alt="Calendar"
            width={24}
            height={24}
          />
        </div>
        <BigCalendar />
      </div>
      {/*Right Side DashBoard Panel*/}
      <div className="md:1/2 flex w-full flex-col gap-4 xl:w-1/3">
        <EventCalendar />
        <DashboardEventContainer />
        <DashboardAnnouncementContainer />
      </div>
    </div>
  );
}
