import UserCard from "@/components/allDashboardComp/UserCard";

export default function DashboardPanelWidgets() {
  return (
    <div className="flex flex-col justify-between p-4 md:flex-row">
      {/*Left Side DashBoard Panel*/}
      <div className="md:1/2 w-full lg:w-2/3">
        {/*User Card*/}
        <UserCard userType="students"></UserCard>
        <UserCard userType="teachers"></UserCard>
        <UserCard userType="parents"></UserCard>
        <UserCard userType="stuff"></UserCard>
      </div>
      {/*Right Side DashBoard Panel*/}
      <div className="md:1/2 w-full lg:w-1/3">k</div>
    </div>
  );
}
