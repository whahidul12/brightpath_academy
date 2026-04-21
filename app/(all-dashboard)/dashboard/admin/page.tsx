import AttendanceCount from "@/components/allDashboardComp/AttendenceCount";
import EventCalendarContainer from "@/components/allDashboardComp/EventCalendarContainer";
import GenderCount from "@/components/allDashboardComp/GenderCount";
import UserCard from "@/components/allDashboardComp/UserCard";
import { FinanceChart } from "@/components/charts/FinanceChart";
import { DashboardAnnouncementContainer } from "@/components/eventComp/DashboardAnnouncementContainer";
import { auth } from "@clerk/nextjs/server";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  return (
    <div className="flex flex-col justify-between gap-4 p-4 md:flex-row">
      {/*Left Side DashBoard Panel*/}
      <div className="flex w-full flex-col gap-4 pt-0 lg:w-2/3">
        {/*User Card*/}
        <div className="flex flex-wrap justify-between gap-4">
          <UserCard userType="student"></UserCard>
          <UserCard userType="teacher"></UserCard>
          <UserCard userType="parent"></UserCard>
        </div>
        {/*Middle Chart*/}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/*Attendance Chart*/}
          <div className="w-full rounded-lg lg:w-2/3">
            <AttendanceCount />
          </div>
          {/*Count Chart*/}
          <div className="w-full rounded-lg lg:w-1/3">
            <GenderCount />
          </div>
        </div>
        {/*Bottom chart*/}
        <div className="bg-card w-full rounded-lg">
          <FinanceChart />
        </div>
      </div>
      {/*Right Side DashBoard Panel*/}
      <div className="flex w-full flex-col gap-4 lg:w-1/3">
        <EventCalendarContainer searchParams={searchParams} />
        <DashboardAnnouncementContainer userId={userId} role={role} />
      </div>
    </div>
  );
}
