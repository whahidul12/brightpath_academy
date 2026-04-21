"use client";

import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", Income: 4000, Expense: 2400 },
  { name: "Feb", Income: 3000, Expense: 1398 },
  { name: "Mar", Income: 2000, Expense: 9800 },
  { name: "Apr", Income: 2780, Expense: 3908 },
  { name: "May", Income: 1890, Expense: 4800 },
  { name: "Jun", Income: 2390, Expense: 3800 },
  { name: "Jul", Income: 3490, Expense: 4300 },
  { name: "Aug", Income: 3490, Expense: 4300 },
  { name: "Sep", Income: 3490, Expense: 4300 },
  { name: "Oct", Income: 3490, Expense: 4300 },
  { name: "Nov", Income: 3490, Expense: 4300 },
  { name: "Dec", Income: 3490, Expense: 4300 },
];

export const FinanceChart = () => {
  return (
    <div className="border-border/40 bg-card space-y-4 rounded-2xl border p-5 shadow-sm transition-all">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Finance</h2>
          <p className="text-muted-foreground text-xs">
            Income vs Expense (Monthly)
          </p>
        </div>

        <button className="rounded-md p-1.5 transition hover:bg-black/5 dark:hover:bg-white/10">
          <Image src="/icons/moreDark.png" alt="more" width={16} height={16} />
        </button>
      </div>

      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
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

            <Line
              type="monotone"
              dataKey="Income"
              stroke="hsl(var(--primary-hsl))"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5 }}
            />

            <Line
              type="monotone"
              dataKey="Expense"
              stroke="hsl(var(--secondary-hsl))"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
