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

export type SubjectList = Subject;

export type ClassList = Class;

export type LessonList = Lesson;

export type ExamList = Exam;

export type AssignmentList = Assignment;

export type ResultList = Result;

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
