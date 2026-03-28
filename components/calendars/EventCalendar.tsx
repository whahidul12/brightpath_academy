"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./eventCalendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="bg-card text-card-foreground rounded-lg p-4">
      <Calendar onChange={onChange} value={value} calendarType="islamic" />
    </div>
  );
};
