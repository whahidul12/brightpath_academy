import Image from "next/image";
import { DashboardAnnouncement } from "../microComponents/DashboardAnnouncement";
import { prisma } from "@/src";

const announcements = [
  {
    id: 1,
    title: "Student Council Elections",
    time: "12PM - 2PM",
    description:
      "Submit your candidate application forms to the main office before the deadline this Friday.",
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    classId: null,
  },
  {
    id: 2,
    title: "Science Fair Update",
    time: "12PM - 2PM",
    description:
      "All science fair project boards must be set up in the gymnasium by Monday.",
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    classId: null,
  },
  {
    id: 3,
    title: "Early Dismissal Notice",
    time: "12PM - 2PM",
    description:
      "School will finish two hours early tomorrow for the scheduled teacher professional development day.",
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    classId: null,
  },
];

export const DashboardAnnouncementContainer = async ({
  userId,
  role,
}: {
  userId: string | null;
  role: string | undefined;
}) => {
  let classCondition: any = null;

  if (userId && role) {
    if (role === "teacher") {
      classCondition = { teacherId: userId };
    } else if (role === "student") {
      classCondition = { students: { some: { id: userId } } };
    } else if (role === "parent") {
      classCondition = { students: { some: { parentId: userId } } };
    }
  }

  const announcements = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          ...(classCondition ? [{ class: classCondition }] : []),
        ],
      }),
    },
  });

  // console.log("Final Fetch Count:", announcements.length);

  return (
    <div className="border-border/40 bg-card space-y-4 rounded-2xl border p-5 shadow-sm transition-all">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Announcements
          </h2>
          <p className="text-muted-foreground text-xs">
            Latest updates & notices
          </p>
        </div>

        <button className="rounded-md p-1.5 transition hover:bg-black/5 dark:hover:bg-white/10">
          <Image
            src="/icons/moreDark.png"
            alt="more-icon"
            width={16}
            height={16}
          />
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {announcements.map((announcement) => (
          <DashboardAnnouncement
            key={announcement.id}
            announcement={announcement}
          />
        ))}
      </div>
    </div>
  );
};
