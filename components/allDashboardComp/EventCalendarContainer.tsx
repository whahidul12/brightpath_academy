import { EventCalendar } from "../calendars/EventCalendar";
import { DashboardEventContainer } from "../eventComp/dashbooardEventContainer ";

export default async function EventContainer({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { date } = await searchParams;
  return (
    <>
      <EventCalendar />
      <DashboardEventContainer dateParam={date} />
    </>
  );
}
