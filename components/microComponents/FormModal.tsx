"use client";
import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { DeleteConfirmation } from "../modals/DeleteConfirmation";
import { CardType } from "@/shared/types/types";

const TeacherForm = dynamic(() => import("../forms/TeacherForm"), {
  loading: () => <span>Loading...</span>,
});

const StudentForm = dynamic(() => import("../forms/StudentForm"), {
  loading: () => <span>Loading...</span>,
});
const SubjectForm = dynamic(() => import("../forms/SubjectForm"), {
  loading: () => <span>Loading...</span>,
});

// 1. Move this outside or into a separate config file
// 1. Update the type definition to include the 3rd argument

export default function FormModal({
  table,
  type,
  data,
  id,
  relatedData,
}: {
  table: CardType;
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
  relatedData?: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const forms: {
    [key: string]: (
      type: "create" | "update",
      setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, // Add this
      data?: any,
      relatedData?: any,
    ) => React.JSX.Element;
  } = {
    // 2. Update the arrow functions to receive and pass the setter
    teacher: (type, data, setIsOpen, relatedData) => (
      <TeacherForm
        type={type}
        data={data}
        setIsOpen={setIsOpen}
        relatedData={relatedData}
      />
    ),
    student: (type, data, setIsOpen, relatedData) => (
      <StudentForm
        type={type}
        data={data}
        setIsOpen={setIsOpen}
        relatedData={relatedData}
      />
    ),
    subject: (type, data, setIsOpen, relatedData) => (
      <SubjectForm
        type={type}
        data={data}
        setIsOpen={setIsOpen}
        relatedData={relatedData}
      />
    ),
  };
  const renderContent = () => {
    if (type === "delete") {
      return id ? <DeleteConfirmation id={id} table={table} /> : "Missing ID";
    }

    const Form = forms[table];
    return Form ? (
      Form(type, data, setIsOpen, relatedData)
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
