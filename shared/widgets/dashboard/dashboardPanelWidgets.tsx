import UserCard from "@/components/allDashboardComp/UserCard";
import CountChart from "@/components/charts/CountChart";

export default function DashboardPanelWidgets() {
  return (
    <div className="flex flex-col justify-between p-4 md:flex-row">
      {/*Left Side DashBoard Panel*/}
      <div className="md:1/2 flex w-full flex-col gap-4 p-4 lg:w-2/3">
        {/*User Card*/}
        <div className="flex flex-wrap justify-between gap-4">
          <UserCard userType="students"></UserCard>
          <UserCard userType="teachers"></UserCard>
          <UserCard userType="parents"></UserCard>
          <UserCard userType="stuff"></UserCard>
        </div>
        {/*Middle Chart*/}
        <div className="flex flex-col lg:flex-row">
          {/*Count Chart*/}
          <div className="bg-card h-112.5 w-full rounded-lg lg:w-1/3">
            <CountChart />
          </div>
          {/*Attendance Chart*/}
          <div className="w-full lg:w-2/3">{/*<CountChart />*/}</div>
        </div>
        {/*Bottom chart*/}
        <div>bottom cgart</div>
      </div>
      {/*Right Side DashBoard Panel*/}
      <div className="md:1/2 w-full lg:w-1/3">k</div>
    </div>
  );
}
