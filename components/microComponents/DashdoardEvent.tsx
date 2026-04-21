export const DashboardEvent = ({
  event,
}: {
  event: {
    id: number;
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    createdAt: Date;
    updatedAt: Date;
    classId: number | null;
  };
}) => {
  return (
    <div className="border-primary mt-4 border-t-2">
      <div className="flex items-center justify-between">
        <h3 className="mt-1.5 font-semibold">{event.title}</h3>
        <p>
          {new Date(event.startTime).toLocaleTimeString("en-UK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </p>
      </div>
      <p className="text-gray-400">{event.description}</p>
    </div>
  );
};
