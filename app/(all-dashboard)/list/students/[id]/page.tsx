import SingleUserCard from "@/components/allDashboardComp/singleUserCard";
import SingleUserStates from "@/components/allDashboardComp/SingleUserStates";
import { BigCalendar } from "@/components/calendars/BigCalendar";
import Link from "next/link";
import Performance from "@/components/charts/Performance";
import { DashboardAnnouncementContainer } from "@/components/eventComp/DashboardAnnouncementContainer";

export default function SingleStudentPage() {
  return (
    <div className="flex flex-col justify-between gap-4 p-4 md:flex-row">
      {/*Left Side DashBoard Panel*/}
      <div className="flex w-full flex-col gap-4 pt-0 lg:w-2/3">
        {/*Top Part*/}
        <div className="flex flex-col gap-4 xl:flex-row">
          {/*Single User card*/}
          <div className="bg-primary/20 text-card-foreground rounded-lg p-4 xl:w-1/2">
            <SingleUserCard />
          </div>
          {/*Small card*/}
          <div className="flex flex-wrap justify-between gap-4 xl:w-1/2">
            <SingleUserStates
              type="student"
              data="90%"
              image="singleAttendance"
            />
            <SingleUserStates type="student" data="90%" image="singleBranch" />
            <SingleUserStates
              type="student"
              data="90%"
              image="singleAttendance"
            />
            <SingleUserStates
              type="student"
              data="90%"
              image="singleAttendance"
            />
          </div>
        </div>
        {/*Bottom Part*/}
        <div className="bg-card flex h-200 flex-col gap-4 rounded-lg p-4">
          <h1 className="text-2xl font-semibold">Teacher&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/*Right Side DashBoard Panel*/}
      {/*<div className="flex w-full flex-col gap-4 lg:w-1/3">right</div>*/}
      <div className="flex w-full flex-col gap-4 xl:w-1/3">
        <div className="bg-card rounded-md p-4">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
            <Link
              className="bg-primary/20 text-card-foreground rounded-md p-3"
              href={`#`}
            >
              Teacher&apos;s Classes
            </Link>
            <Link
              className="bg-primary/20 text-card-foreground rounded-md p-3"
              href={`#`}
            >
              Teacher&apos;s Students
            </Link>
            <Link
              className="bg-primary/20 text-card-foreground rounded-md p-3"
              href={`#`}
            >
              Teacher&apos;s Lessons
            </Link>
            <Link
              className="bg-primary/20 text-card-foreground rounded-md p-3"
              href={`#`}
            >
              Teacher&apos;s Exams
            </Link>
            <Link
              className="bg-primary/20 text-card-foreground rounded-md p-3"
              href={`#`}
            >
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
        <Performance />
        <DashboardAnnouncementContainer />
      </div>
    </div>
  );
}
