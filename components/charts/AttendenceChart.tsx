"use client";
import Image from "next/image";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AttendenceChart({
  data,
}: {
  data: { name: string; present: number; absent: number }[];
}) {
  return (
    <>
      {/* Chart */}
      <div className="h-72 w-full min-w-0">
        <ResponsiveContainer width="100%" height={288}>
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
              dataKey="present"
              radius={[8, 8, 0, 0]}
              barSize={18}
              fill="hsl(var(--primary-hsl))"
            />
            <Bar
              dataKey="absent"
              radius={[8, 8, 0, 0]}
              barSize={18}
              fill="hsl(var(--secondary-hsl))"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
