"use client";

import Image from "next/image";
import { useState } from "react";
import { DeleteConfirmation } from "../modals/DeleteConfirmation";
import dynamic from "next/dynamic";
import { CardType } from "@/shared/types/types";

const TeacherForm = dynamic(
  () => import("../forms/TeacherForm").then((mod) => mod.TeacherForm),
  { ssr: false, loading: () => <span>Loading...</span> },
);

const StudentForm = dynamic(
  () => import("../forms/StudentForm").then((mod) => mod.StudentForm),
  { ssr: false, loading: () => <span>Loading...</span> },
);

// 1. Move this outside or into a separate config file
const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
};

export default function FormModal({
  table,
  type,
  data,
  id,
}: {
  table: CardType;
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const renderContent = () => {
    if (type === "delete") {
      return id ? <DeleteConfirmation id={id} table={table} /> : "Missing ID";
    }

    const Form = forms[table];
    return Form ? (
      Form(type, data)
    ) : (
      <p>Form for {table} is under construction.</p>
    );
  };

  const bgButtonColor =
    type === "delete"
      ? "bg-secondary"
      : type === "create"
        ? "bg-primary"
        : "bg-primary";

  return (
    <>
      <button
        className={`${bgButtonColor} flex h-8 w-8 items-center justify-center rounded-full hover:opacity-80`}
        onClick={() => setIsOpen(true)}
      >
        <Image src={`/icons/${type}.png`} alt={type} width={16} height={16} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-[90%] overflow-y-auto rounded-xl bg-white p-8 text-black md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            {/* Close Button */}
            <div
              className="absolute top-4 right-4 cursor-pointer rounded-full p-1 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <Image
                src="/icons/close.png"
                alt="close"
                width={14}
                height={14}
              />
            </div>

            {/* Content Logic */}
            {renderContent()}
          </div>
        </div>
      )}
    </>
  );
}
