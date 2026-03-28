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
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
const data = [
  {
    name: "Jan",
    Income: 4000,
    Expense: 2400,
  },
  {
    name: "Feb",
    Income: 3000,
    Expense: 1398,
  },
  {
    name: "Mar  ",
    Income: 2000,
    Expense: 9800,
  },
  {
    name: "Apr",
    Income: 2780,
    Expense: 3908,
  },
  {
    name: "May",
    Income: 1890,
    Expense: 4800,
  },
  {
    name: "Jun",
    Income: 2390,
    Expense: 3800,
  },
  {
    name: "Jul",
    Income: 3490,
    Expense: 4300,
  },
  {
    name: "Aug",
    Income: 3490,
    Expense: 4300,
  },
  {
    name: "Sep",
    Income: 3490,
    Expense: 4300,
  },
  {
    name: "Oct",
    Income: 3490,
    Expense: 4300,
  },
  {
    name: "Nov",
    Income: 3490,
    Expense: 4300,
  },
  {
    name: "Dec",
    Income: 3490,
    Expense: 4300,
  },
];

export const FinanceChart = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">Finance</span>
        <Image
          src="/icons/moreDark.png"
          alt="more-icon"
          width={30}
          height={10}
        />
      </div>
      <div className="h-full w-full">
        <LineChart
          style={{
            width: "100%",
            // maxWidth: "700px",
            height: "50%",
            maxHeight: "380px",
            aspectRatio: 1.8,
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            stroke="var(--card-foreground)"
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            width="auto"
            stroke="var(--card-foreground)"
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{
              stroke: "var(--color-border-2)",
            }}
            contentStyle={{
              backgroundColor: "var(--color-surface-raised)",
              borderColor: "var(--color-border-2)",
            }}
          />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "20px" }}
          />
          <Line
            type="monotone"
            dataKey="Income"
            stroke="var(--primary)"
            strokeWidth="4px"
            dot={{
              fill: "var(--primary)",
            }}
            activeDot={{ r: 8, stroke: "var(--color-surface-base)" }}
          />
          <Line
            type="monotone"
            dataKey="Expense"
            stroke="var(--secondary)"
            strokeWidth="4px"
            dot={{
              fill: "var(--secondary)",
            }}
            activeDot={{ r: 8, stroke: "var(--color-surface-base)" }}
          />
          <RechartsDevtools />
        </LineChart>
      </div>
    </div>
  );
};
