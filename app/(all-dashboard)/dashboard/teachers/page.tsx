import EventCalendarContainer from "@/components/allDashboardComp/EventCalendarContainer";
import BigCalendarContainer from "@/components/allDashboardComp/BigCalendarContainer";
import { DashboardAnnouncementContainer } from "@/components/eventComp/DashboardAnnouncementContainer";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function TeachersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
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
        <BigCalendarContainer type="teacherId" id={userId as string} />
      </div>
      {/*Right Side DashBoard Panel*/}
      <div className="md:1/2 flex w-full flex-col gap-4 xl:w-1/3">
        <EventCalendarContainer searchParams={searchParams} />
        <DashboardAnnouncementContainer userId={userId} role={role} />
      </div>
    </div>
  );
}
