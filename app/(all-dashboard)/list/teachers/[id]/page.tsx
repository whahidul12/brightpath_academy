import SingleUserCard from "@/components/allDashboardComp/singleUserCard";
import SingleUserStates from "@/components/allDashboardComp/SingleUserStates";
import BigCalendarContainer from "@/components/allDashboardComp/BigCalendarContainer";
import Link from "next/link";
import Performance from "@/components/charts/Performance";
import { DashboardAnnouncementContainer } from "@/components/eventComp/DashboardAnnouncementContainer";
import { auth } from "@clerk/nextjs/server";

export default async function SingleTeacherPage({
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
        {/*Top Part*/}
        <div className="flex flex-col gap-4 xl:flex-row">
          {/*Single User card*/}
          <div className="bg-primary/20 text-card-foreground rounded-lg p-4 xl:w-1/2">
            <SingleUserCard type={"teacher"} />
          </div>
          {/*Small card*/}
          <div className="flex flex-wrap justify-between gap-4 xl:w-1/2">
            <SingleUserStates
              type="teacher"
              data="90%"
              image="singleAttendance"
            />
            <SingleUserStates type="teacher" data="90%" image="singleBranch" />
            <SingleUserStates
              type="teacher"
              data="90%"
              image="singleAttendance"
            />
            <SingleUserStates
              type="teacher"
              data="90%"
              image="singleAttendance"
            />
          </div>
        </div>
        {/*Bottom Part*/}
        <div className="bg-card flex h-200 flex-col gap-4 rounded-lg p-4">
          <h1 className="text-2xl font-semibold">Teacher&apos;s Schedule</h1>
          <BigCalendarContainer type="teacherId" id={userId as string} />
        </div>
      </div>
      {/*Right Side DashBoard Panel*/}
      {/*<div className="flex w-full flex-col gap-4 lg:w-1/3">right</div>*/}
      <div className="flex w-full flex-col gap-4 xl:w-1/3">
        <div className="bg-card text-card-foreground rounded-md p-4">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
            <Link
              className="bg-primary/20 text-card-foreground rounded-md p-3"
              href={`/list/classes?supervisorId=${"teacher2"}`}
            >
              Teacher&apos;s Classes
            </Link>
            <Link
              className="bg-primary/20 text-card-foreground rounded-md p-3"
              href={`/list/students?teacherId=${"teacher2"}`}
            >
              Teacher&apos;s Students
            </Link>
            <Link
              className="bg-primary/20 text-card-foreground rounded-md p-3"
              href={`/list/lessons?teacherId=${"teacher2"}`}
            >
              Teacher&apos;s Lessons
            </Link>
            <Link
              className="bg-primary/20 text-card-foreground rounded-md p-3"
              href={`/list/exams?teacherId=${"teacher2"}`}
            >
              Teacher&apos;s Exams
            </Link>
            <Link
              className="bg-primary/20 text-card-foreground rounded-md p-3"
              href={`/list/assignments?teacherId=${"teacher2"}`}
            >
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
        <Performance />
        <DashboardAnnouncementContainer userId={userId} role={role} />
      </div>
    </div>
  );
}
