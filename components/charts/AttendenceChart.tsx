"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";

const data = [
  { name: "Sun", Present: 1890, Absent: 4800 },
  { name: "Mon", Present: 4000, Absent: 2400 },
  { name: "Tue", Present: 3000, Absent: 1398 },
  { name: "Wed", Present: 2000, Absent: 9800 },
  { name: "Thu", Present: 2780, Absent: 3908 },
];

export default function AttendenceChart() {
  return (
    <div className="border-border/40 bg-card rounded-2xl border p-5 shadow-sm transition-all">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Attendance</h2>
          <p className="text-muted-foreground text-xs">Weekly overview</p>
        </div>

        <button className="rounded-md p-1.5 transition hover:bg-black/5 dark:hover:bg-white/10">
          <Image src="/icons/moreDark.png" alt="more" width={16} height={16} />
        </button>
      </div>

      {/* Chart */}
      <div className="h-70 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              horizontal
              vertical={false}
              stroke="hsl(var(--chart-border-hsl))"
              strokeOpacity={0.6}
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              fontSize={12}
            />

            <YAxis axisLine={false} tickLine={false} fontSize={12} />

            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid hsl(var(--chart-border-hsl))",
                backgroundColor: "hsl(var(--chart-bg-hsl))",
                fontSize: "12px",
              }}
            />

            <Legend
              verticalAlign="top"
              align="left"
              wrapperStyle={{
                fontSize: "12px",
                paddingBottom: "10px",
              }}
            />

            <Bar
              dataKey="Present"
              radius={[8, 8, 0, 0]}
              barSize={18}
              fill="hsl(var(--primary-hsl))"
            />
            <Bar
              dataKey="Absent"
              radius={[8, 8, 0, 0]}
              barSize={18}
              fill="hsl(var(--secondary-hsl))"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
