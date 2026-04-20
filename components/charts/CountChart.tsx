"use client";

import {
  RadialBarChart,
  RadialBar,
  Tooltip,
  PolarAngleAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Image from "next/image";

const data = [
  { name: "Girls", count: 55, fill: "hsl(var(--secondary-hsl))" },
  { name: "Boys", count: 78, fill: "hsl(var(--primary-hsl))" },
];

const total = data.reduce((acc, item) => acc + item.count, 0);

export default function CountChart() {
  return (
    <div className="border-border/40 bg-card space-y-5 rounded-2xl border p-5 shadow-sm transition-all">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Students</h2>
          <p className="text-muted-foreground text-xs">Distribution overview</p>
        </div>

        <button className="rounded-md p-1.5 transition hover:bg-black/5 dark:hover:bg-white/10">
          <Image src="/icons/moreDark.png" alt="more" width={16} height={16} />
        </button>
      </div>

      {/* Chart */}
      <div className="relative h-55 w-full">
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
              domain={[0, total]}
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

      {/* Stats */}
      <div className="flex justify-center gap-8">
        <div className="flex items-center gap-2">
          <div className="bg-primary h-2.5 w-2.5 rounded-full" />
          <div>
            <p className="text-sm font-medium">Boys</p>
            <p className="text-muted-foreground text-xs">
              78 ({Math.round((78 / total) * 100)}%)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-secondary h-2.5 w-2.5 rounded-full" />
          <div>
            <p className="text-sm font-medium">Girls</p>
            <p className="text-muted-foreground text-xs">
              55 ({Math.round((55 / total) * 100)}%)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
