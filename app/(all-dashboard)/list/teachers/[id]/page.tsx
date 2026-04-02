import SingleUserCard from "@/components/allDashboardComp/singleUserCard";

export default function SingleTeacherPage() {
  return (
    <div className="flex flex-col justify-between gap-4 p-4 md:flex-row">
      {/*Left Side DashBoard Panel*/}
      <div className="flex w-full flex-col gap-4 pt-0 lg:w-2/3">
        {/*Top Part*/}
        <div className="flex flex-col gap-4 md:flex-row">
          {/*Single User card*/}
          <div className="bg-card text-card-foreground rounded-lg p-4 md:w-1/2">
            <SingleUserCard />
          </div>
          {/*Small card*/}
          <div className="flex flex-wrap justify-between gap-4 md:w-1/2"></div>
        </div>
        {/*Bottom Part*/}
        <div className="flex flex-col gap-4"></div>
      </div>
      {/*Right Side DashBoard Panel*/}
      <div className="flex w-full flex-col gap-4 lg:w-1/3">right</div>
    </div>
  );
}
