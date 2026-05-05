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
import {
  School,
  Users,
  UserCheck,
  GraduationCap,
  Loader2,
  Save,
  Hash,
} from "lucide-react";

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

  // Reusable Select Styling
  const selectClassName = `w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm
                           outline-none transition-all hover:border-slate-300 focus:ring-2
                           focus:ring-blue-500 focus:border-transparent cursor-pointer`;

  return (
    <form className="flex flex-col gap-8 p-1" onSubmit={onSubmit}>
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-blue-50 p-3">
          <School className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            {type === "create" ? "Create New Class" : "Update Class Details"}
          </h1>
          <p className="text-sm text-slate-500">
            Organize rooms, capacity, and supervisors.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Section 1: Basic Info */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <InputField
            label="Class Name"
            type="text"
            name="name"
            placeholder="e.g. 10-A or Physics Advanced"
            defaultValue={data?.name}
            register={register}
            error={errors.name}
          />
          <InputField
            label="Capacity"
            name="capacity"
            type="number"
            placeholder="Maximum students"
            defaultValue={data?.capacity}
            register={register}
            error={errors.capacity}
          />
          {data?.id && (
            <input type="hidden" {...register("id")} defaultValue={data.id} />
          )}
        </div>

        {/* Section 2: Administration */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <UserCheck className="h-4 w-4 text-blue-500" />
              Supervisor
            </label>
            <select
              {...register("supervisorId")}
              defaultValue={data?.supervisorId}
              className={selectClassName}
            >
              <option value="">Select a Supervisor</option>
              {teachers?.map((teach: any) => (
                <option key={teach.id} value={teach.id}>
                  {teach.name} {teach.surname}
                </option>
              ))}
            </select>
            {errors.supervisorId?.message && (
              <p className="text-xs font-medium text-red-500">
                {String(errors.supervisorId.message)}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <GraduationCap className="h-4 w-4 text-blue-500" />
              Grade Level
            </label>
            <select
              {...register("gradeId")}
              defaultValue={data?.gradeId}
              className={selectClassName}
            >
              <option value="">Select Grade</option>
              {grades?.map((grade: any) => (
                <option key={grade.id} value={grade.id}>
                  Grade {grade.level}
                </option>
              ))}
            </select>
            {errors.gradeId?.message && (
              <p className="text-xs font-medium text-red-500">
                {String(errors.gradeId.message)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-2 font-semibold text-white shadow-md shadow-blue-100 transition-all hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>{type === "create" ? "Create Class" : "Save Changes"}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
