export const DashboardEvent = ({
  tile,
  time,
  description,
}: {
  tile: string;
  time: string;
  description: string;
}) => {
  return (
    <div className="border-primary mt-4 border-t-2">
      <div className="flex items-center justify-between">
        <h3 className="mt-1 font-semibold">{tile}</h3>
        <p>{time}</p>
      </div>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};
