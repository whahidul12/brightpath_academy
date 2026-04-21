"use client";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useMemo, useState } from "react";
import "./BigCalendar.css";

moment.updateLocale("en", {
  week: {
    dow: 0,
    doy: 4,
  },
});

const localizer = momentLocalizer(moment);

export const BigCalendar = ({
  schedule,
}: {
  schedule: { title: string; start: Date; end: Date }[];
}) => {
  const [view, setView] = useState<View>(Views.MONTH);

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  const viewsList = useMemo(() => ["month", "week", "day"] as View[], []);

  return (
    <div style={{ height: "100%" }}>
      <Calendar
        localizer={localizer}
        events={schedule}
        startAccessor="start"
        endAccessor="end"
        views={viewsList}
        view={view}
        onView={handleViewChange}
        style={{ height: "100%" }}
        dayPropGetter={(date) => {
          const day = date.getDay();
          if (day === 5 || day === 6) {
            return {
              className: "hidden-day",
              style: { display: "none" },
            };
          }
          return {};
        }}
        min={new Date(2026, 0, 1, 8, 0, 0)}
        max={new Date(2026, 0, 1, 17, 0, 0)}
      />
    </div>
  );
};
