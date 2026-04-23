import Image from "next/image";
import AttendenceChart from "../charts/AttendenceChart";
import { prisma } from "@/lib/prisma";

export default async function AttendanceCount() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysSinceMonday);

  const resData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastMonday,
      },
    },
    select: {
      date: true,
      present: true,
    },
  });

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu"];

  const attendanceMap: { [key: string]: { present: number; absent: number } } =
    {
      Sun: { present: 0, absent: 0 },
      Mon: { present: 0, absent: 0 },
      Tue: { present: 0, absent: 0 },
      Wed: { present: 0, absent: 0 },
      Thu: { present: 0, absent: 0 },
    };

  resData.forEach((item) => {
    const itemDate = new Date(item.date);
    const dayIndex = itemDate.getDay();

    if (dayIndex >= 0 && dayIndex <= 4) {
      const dayName = daysOfWeek[dayIndex];
      if (item.present) {
        attendanceMap[dayName].present++;
      } else {
        attendanceMap[dayName].absent++;
      }
    }
  });

  // const data = daysOfWeek.map((day) => ({
  //   name: day,
  //   present: attendanceMap[day].present,
  //   absent: attendanceMap[day].absent,
  // }));

  // Hardcoded values to test the bar chart UI
  const data = [
    { name: "Sun", present: 65, absent: 35 },
    { name: "Mon", present: 60, absent: 40 },
    { name: "Tue", present: 70, absent: 30 },
    { name: "Wed", present: 90, absent: 10 },
    { name: "Thu", present: 90, absent: 10 },
  ];
  // console.log(data);

  return (
    <>
      <div className="border-border/40 bg-card rounded-2xl border p-5 shadow-sm transition-all">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold tracking-tight">
              Attendance
            </h2>
            <p className="text-muted-foreground text-xs">Weekly overview</p>
          </div>

          <button className="rounded-md p-1.5 transition hover:bg-black/5 dark:hover:bg-white/10">
            <Image
              src="/icons/moreDark.png"
              alt="more"
              width={16}
              height={16}
            />
          </button>
        </div>
        <AttendenceChart data={data} />
      </div>
    </>
  );
}
