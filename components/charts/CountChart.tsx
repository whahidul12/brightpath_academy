"use client";

import { RadialBarChart, RadialBar, Tooltip, PolarAngleAxis } from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import Image from "next/image";

const data = [
  {
    name: "Girls",
    count: 55,
    fill: "oklch(0.78 0.15 49)",
  },
  {
    name: "Boys",
    count: 78,
    fill: "oklch(0.7 0.18 254)",
  },
];

const CountChart = () => {
  return (
    <div className="flex h-full flex-col justify-between p-4">
      {/*Title*/}
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">Students</span>
        <Image
          src="/icons/more.png"
          alt="more-icon"
          width={30}
          height={10}
          className="w-fit"
        />
      </div>
      {/*Chart*/}
      <div className="h-fit w-full">
        <RadialBarChart
          width="100%"
          height="100%"
          cx="50%"
          cy="50%"
          innerRadius="40%"
          outerRadius="100%"
          barSize={32}
          data={data}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 133]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar background dataKey="count" />
          <Tooltip />
          <RechartsDevtools />
        </RadialBarChart>
      </div>
      {/*Buttons*/}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1 text-center">
          <div className="bg-primary mx-auto h-5 w-5 rounded-full"></div>
          <h1 className="font-bold">1234</h1>
          <p className="text-xs text-gray-500">Boys(50%)</p>
        </div>
        <div className="flex flex-col gap-1 text-center">
          <div className="bg-secondary mx-auto h-5 w-5 rounded-full"></div>
          <h1 className="font-bold">1234</h1>
          <p className="text-xs text-gray-500">Girls(50%)</p>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
