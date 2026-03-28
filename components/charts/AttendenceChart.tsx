"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import Image from "next/image";

const data = [
  {
    name: "Sun",
    Present: 1890,
    Absent: 4800,
  },
  {
    name: "Mon",
    Present: 4000,
    Absent: 2400,
  },
  {
    name: "Tue",
    Present: 3000,
    Absent: 1398,
  },
  {
    name: "Wed",
    Present: 2000,
    Absent: 9800,
  },
  {
    name: "Thu",
    Present: 2780,
    Absent: 3908,
  },
];

export default function AttendenceChart() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">Attendance</span>
        <Image
          src="/icons/moreDark.png"
          alt="more-icon"
          width={30}
          height={10}
        />
      </div>
      <div className="h-full w-full">
        <BarChart
          style={{
            width: "100%",
            maxWidth: "700px",
            height: "100%",
            maxHeight: "70vh",
            aspectRatio: 1.4,
          }}
          responsive
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            stroke="var(--card-foreground)"
          />
          <YAxis
            width="auto"
            axisLine={false}
            tickLine={false}
            stroke="var(--card-foreground)"
          />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              color: "gray",
            }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "20px", paddingBottom: "20px" }}
          />
          <Bar
            dataKey="Present"
            fill="var(--primary)"
            radius={[25, 25, 0, 0]}
            legendType="circle"
          />
          <Bar
            dataKey="Absent"
            fill="var(--secondary)"
            radius={[25, 25, 0, 0]}
            legendType="circle"
          />
          <RechartsDevtools />
        </BarChart>
      </div>
    </div>
  );
}
