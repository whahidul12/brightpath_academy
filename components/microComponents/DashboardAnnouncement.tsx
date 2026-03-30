export const DashboardAnnouncement = ({
  tile,
  time,
  description,
}: {
  tile: string;
  time: string;
  description: string;
}) => {
  return (
    <div className="odd:bg-primary/10 even:bg-secondary/10 mt-4 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <h3 className="mt-1 font-semibold">{tile}</h3>
        <p>{time}</p>
      </div>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};
