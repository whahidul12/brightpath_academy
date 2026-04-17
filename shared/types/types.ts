import {
  Subject,
  Teacher,
  Lesson,
  Class,
  Student,
  Parent,
  Exam,
  Assignment,
  Result,
  Event,
  Announcement,
} from "@/src/generated/prisma/client";

export type TeacherList = Teacher & { subjects: Subject[] } & {
  classes: Class[];
};

export type StudentList = Student & { class: Class };

export type ParentList = Parent & { students: Student[] };

export type SubjectList = Subject & { teachers: Teacher[] };

export type ClassList = Class & { supervisor: Teacher };

export type LessonList = Lesson & { subject: Subject } & { class: Class } & {
  teacher: Teacher;
};

export type ExamList = Exam & {
  lesson: {
    subject: Subject;
    class: Class;
    teacher: Teacher;
  };
};

export type AssignmentList = Assignment & {
  lesson: {
    subject: Subject;
    class: Class;
    teacher: Teacher;
  };
};

export type ResultList = {
  id: number;
  title: string;
  studentName: string;
  studentSurname: string;
  teacherName: string;
  teacherSurname: string;
  score: number;
  className: string;
  startTime: Date;
};

export type EventList = Event;

export type AnnouncementList = Announcement;

export type CardType =
  | "student"
  | "teacher"
  | "parent"
  | "subject"
  | "class"
  | "lesson"
  | "assignment"
  | "exam"
  | "result"
  | "attendance"
  | "event"
  | "announcement";
