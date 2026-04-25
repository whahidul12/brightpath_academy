"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useActionState, startTransition, useEffect } from "react";
import { InputField } from "./InputField";
import { toast } from "sonner";
import { createClass } from "@/features/create/createClass/actions";
import { FormProps } from "@/shared/types/types";
import { updateClass } from "@/features/update/updateClass/actions";
import { ClassFormSchema } from "@/shared/schemas/ClassFormSchema";

export default function ClassForm({
  type,
  setIsOpen,
  data,
  relatedData,
}: FormProps) {
  const { teachers, grades } = relatedData;
  const actionToExecute = type === "create" ? createClass : updateClass;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ClassFormSchema),
    defaultValues: data,
  });

  const [state, formAction, isPending] = useActionState(actionToExecute, {
    success: false,
    error: false,
  });

  useEffect(() => {
    if (state.success) {
      toast.success(
        `Subject ${type === "create" ? "created" : "updated"} successfully`,
        {
          description: `The subject has been ${type === "create" ? "added" : "updated"}.`,
          duration: 4000,
          style: {
            background: "#f0fdf4",
            border: "1px solid #86efac",
            color: "#14532d",
          },
        },
      );
      setIsOpen(false);
    } else if (state.error) {
      toast.error("Something went wrong", {
        description:
          typeof state.error === "string" ? state.error : "Please try again.",
        duration: 4000,
        style: {
          background: "#fef2f2",
          border: "1px solid #fca5a5",
          color: "#7f1d1d",
        },
      });
    }
  }, [type, state, setIsOpen]);

  const onSubmit = handleSubmit((formData) => {
    startTransition(() => {
      formAction(formData);
    });
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-2xl font-bold">
        {type === "create" ? "Create a new Class" : "Update Class"}
      </h1>
      <span className="text-xs font-medium">Class Information</span>
      <div className="flex flex-wrap justify-between gap-4">
        <InputField
          label="Class Name"
          name="className"
          type="text"
          defaultValue={data?.className ?? ""}
          register={register}
          error={errors.className}
        />
        <InputField
          label="Capacity"
          name="capacity"
          type="text"
          defaultValue={data?.capacity ?? ""}
          register={register}
          error={errors.capacity}
        />
        {data && (
          <InputField
            label="ID"
            name="id"
            type="text"
            defaultValue={data?.id ?? ""}
            register={register}
            error={errors.id}
            hidden
          />
        )}
      </div>
      <div className="flex w-full flex-col gap-2 md:w-1/4">
        <label htmlFor="teachers">Superviser</label>
        <select
          {...register("superviserId")}
          defaultValue={data?.teachers}
          className="ring-1"
        >
          <option selected value="default teacer">
            Select One
          </option>
          {teachers?.map(
            (teach: { id: string; name: string; surname: string }) => (
              <option key={teach.id} value={teach.id}>
                {teach.name + " " + teach.surname}
              </option>
            ),
          )}
        </select>
        {errors.superviserId?.message && (
          <p className="text-red-500">
            {errors.superviserId.message.toString()}
          </p>
        )}
      </div>
      <div className="flex w-full flex-col gap-2 md:w-1/4">
        <label htmlFor="grades">Grade</label>
        <select
          {...register("gradeId")}
          defaultValue={data?.gradeId}
          className="ring-1"
        >
          <option selected value="default grade">
            Select One
          </option>
          {grades?.map(
            (grade: { id: string; name: string; surname: string }) => (
              <option key={grade.id} value={grade.id}>
                {grade.level}
              </option>
            ),
          )}
        </select>
        {errors.gradeId?.message && (
          <p className="text-red-500">{errors.gradeId.message.toString()}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-500 p-2 text-white disabled:bg-gray-400"
      >
        {isPending ? "Processing..." : type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}
