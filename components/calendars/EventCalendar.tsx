"use client";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./eventCalendar.css";
import { useRouter } from "next/navigation";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const EventCalendar = () => {
  const [value, setValue] = useState<Value>(new Date());

  const router = useRouter();

  useEffect(() => {
    if (value instanceof Date) {
      router.push(`?date=${value.toLocaleDateString("en-US")}`);
    }
  }, [value, router]);

  return (
    <div className="bg-card text-card-foreground rounded-lg p-4 shadow-sm">
      <Calendar onChange={setValue} value={value} calendarType="islamic" />
    </div>
  );
};
