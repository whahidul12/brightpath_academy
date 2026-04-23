"use client";

import {
  RadialBarChart,
  RadialBar,
  Tooltip,
  PolarAngleAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function CountChart({
  boys,
  girls,
  total,
}: {
  boys: number;
  girls: number;
  total: number;
}) {
  const data = [
    { name: "Boys", count: girls, fill: "hsl(var(--secondary-hsl))" },
    { name: "Girls", count: boys, fill: "hsl(var(--primary-hsl))" },
  ];
  return (
    <>
      {/* Chart */}
      <div className="relative h-56 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="90%"
            barSize={20}
            data={data}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, total / 1.2]}
              dataKey="count"
              tick={false}
            />

            <RadialBar dataKey="count" cornerRadius={10} background>
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </RadialBar>

            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-xl font-semibold">{total}</h1>
          <p className="text-muted-foreground text-xs">Total Students</p>
        </div>
      </div>
    </>
  );
}
