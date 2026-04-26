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
  console.log(">>>>", data);

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
        `Class ${type === "create" ? "created" : "updated"} successfully`,
      );
      setIsOpen(false);
    } else if (state.error) {
      toast.error(
        typeof state.error === "string" ? state.error : "Failed to save class",
      );
    }
  }, [state, type, setIsOpen]);

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

      <div className="flex flex-wrap justify-between gap-4">
        <InputField
          label="Class Name"
          type="text"
          name="name" // Matches Prisma 'name'
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        <InputField
          label="Capacity"
          name="capacity"
          type="number"
          defaultValue={data?.capacity}
          register={register}
          error={errors.capacity}
        />
        {data?.id && (
          <input type="hidden" {...register("id")} defaultValue={data.id} />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-400">Supervisor</label>
        <select
          {...register("supervisorId")}
          defaultValue={data?.supervisorId}
          className="rounded-md p-2 text-sm ring-[1.5px] ring-gray-300"
        >
          <option value="">Select a Supervisor</option>
          {teachers?.map((teach: any) => (
            <option key={teach.id} value={teach.id}>
              {teach.name} {teach.surname}
            </option>
          ))}
        </select>
        {errors.supervisorId && (
          <p className="text-xs text-red-400">{errors.supervisorId.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-400">Grade</label>
        <select
          {...register("gradeId")}
          defaultValue={data?.gradeId}
          className="rounded-md p-2 text-sm ring-[1.5px] ring-gray-300"
        >
          <option value="">Select a Grade</option>
          {grades?.map((grade: any) => (
            <option key={grade.id} value={grade.id}>
              {grade.level}
            </option>
          ))}
        </select>
        {errors.gradeId && (
          <p className="text-xs text-red-400">{errors.gradeId.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-blue-500 p-2 text-white disabled:bg-gray-400"
      >
        {isPending ? "Processing..." : type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}
