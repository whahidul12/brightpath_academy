import UserCard from "@/components/allDashboardComp/UserCard";
import { EventCalendar } from "@/components/calendars/EventCalendar";
import AttendenceChart from "@/components/charts/AttendenceChart";
import CountChart from "@/components/charts/CountChart";
import { FinanceChart } from "@/components/charts/FinanceChart";
import { DashboardAnnouncementContainer } from "@/components/eventComp/DashboardAnnouncementContainer";
import { DashboardEventContainer } from "@/components/eventComp/dashbooardEventContainer ";

export default function AdminPage() {
  return (
    <div className="flex flex-col justify-between gap-4 p-4 md:flex-row">
      {/*Left Side DashBoard Panel*/}
      <div className="flex w-full flex-col gap-4 pt-0 lg:w-2/3">
        {/*User Card*/}
        <div className="flex flex-wrap justify-between gap-4">
          <UserCard userType="students"></UserCard>
          <UserCard userType="teachers"></UserCard>
          <UserCard userType="parents"></UserCard>
        </div>
        {/*Middle Chart*/}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/*Attendance Chart*/}
          <div className="bg-card h-112 w-full rounded-lg lg:w-2/3">
            <AttendenceChart />
          </div>
          {/*Count Chart*/}
          <div className="bg-card h-112.5 w-full rounded-lg lg:w-1/3">
            <CountChart />
          </div>
        </div>
        {/*Bottom chart*/}
        <div className="bg-card h-full w-full rounded-lg">
          <FinanceChart />
        </div>
      </div>
      {/*Right Side DashBoard Panel*/}
      <div className="flex w-full flex-col gap-4 lg:w-1/3">
        <EventCalendar />
        <DashboardEventContainer />
        <DashboardAnnouncementContainer />
      </div>
    </div>
  );
}
