"use client";

import { SubjectFormSchema } from "@/shared/schemas/SubjectFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useActionState, startTransition, useEffect } from "react";
import { InputField } from "./InputField";
import { toast } from "sonner";
import { createSubject } from "@/features/create/createSubjects/actions";
import { updateSubject } from "@/features/update/updateSubjects/actions";
import { FormProps } from "@/shared/types/types";
import { Loader2, BookOpen, Users, Save, X } from "lucide-react";

export default function SubjectForm({
  type,
  setIsOpen,
  data,
  relatedData,
}: FormProps) {
  const { teacher } = relatedData;
  const actionToExecute = type === "create" ? createSubject : updateSubject;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SubjectFormSchema),
    defaultValues: data,
  });

  const [state, formAction, isPending] = useActionState(actionToExecute, {
    success: false,
    error: false,
  });

  useEffect(() => {
    if (state.success) {
      toast.success(`Subject ${type === "create" ? "created" : "updated"}`, {
        description: `The subject has been successfully saved.`,
      });
      setIsOpen(false);
    } else if (state.error) {
      toast.error("Action failed", {
        description:
          typeof state.error === "string" ? state.error : "Please try again.",
      });
    }
  }, [state, type, setIsOpen]);

  const onSubmit = handleSubmit((formData) => {
    startTransition(() => {
      formAction(formData);
    });
  });

  return (
    <form className="flex flex-col gap-6 p-1 sm:p-2" onSubmit={onSubmit}>
      {/* Header Section */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              {type === "create" ? "New Subject" : "Edit Subject"}
            </h1>
            <p className="text-sm text-slate-500">
              Fill in the details to manage curriculum subjects.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Section: General Info */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="col-span-full">
            <h2 className="mb-2 text-sm font-semibold tracking-wider text-slate-400 uppercase">
              General Information
            </h2>
          </div>

          <div className="col-span-full md:col-span-1">
            <InputField
              label="Subject Name"
              name="name"
              type="text"
              placeholder="e.g. Advanced Mathematics"
              defaultValue={data?.name ?? ""}
              register={register}
              error={errors.name}
              className="w-full"
            />
          </div>

          {data?.id && (
            <div className="pointer-events-none opacity-60">
              <InputField
                label="Reference ID"
                name="id"
                type="text"
                defaultValue={data?.id ?? ""}
                register={register}
                error={errors.id}
                hidden={false} // Shown but disabled for clarity in updates
              />
            </div>
          )}
        </div>

        {/* Section: Assignments */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-slate-400 uppercase">
            <Users size={16} />
            <h2>Teacher Assignment</h2>
          </div>

          <div className="group relative">
            <select
              multiple
              {...register("teachers")}
              defaultValue={data?.teachers}
              className={`min-h-[120px] w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-white transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${errors.teachers ? "border-red-500" : "border-slate-200 hover:border-slate-300"}`}
            >
              {teacher?.map(
                (teach: { id: string; name: string; surname: string }) => (
                  <option
                    key={teach.id}
                    value={teach.id}
                    className="cursor-pointer rounded-sm p-2 checked:bg-blue-50 hover:bg-slate-50"
                  >
                    {teach.name} {teach.surname}
                  </option>
                ),
              )}
            </select>
            <p className="mt-2 text-xs text-slate-400">
              Hold{" "}
              <kbd className="font-sans font-semibold text-slate-500">Ctrl</kbd>{" "}
              (or{" "}
              <kbd className="font-sans font-semibold text-slate-500">Cmd</kbd>)
              to select multiple teachers.
            </p>
          </div>

          {errors.teachers?.message && (
            <p className="animate-in fade-in slide-in-from-top-1 text-xs font-medium text-red-500">
              {errors.teachers.message.toString()}
            </p>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-4 flex items-center justify-end gap-3 border-t pt-6">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex min-w-[120px] items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save size={18} />
              <span>
                {type === "create" ? "Create Subject" : "Save Changes"}
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
