export const DashboardAnnouncement = ({
  announcement,
}: {
  announcement: {
    id: number;
    title: string;
    description: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
    classId: number | null;
  };
}) => {
  return (
    <div className="odd:bg-primary/10 even:bg-secondary/10 mt-4 rounded-lg p-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{announcement.title}</h3>
        <p>
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
          }).format(announcement.date)}
        </p>
      </div>
      <p className="text-gray-400">{announcement.description}</p>
    </div>
  );
};
