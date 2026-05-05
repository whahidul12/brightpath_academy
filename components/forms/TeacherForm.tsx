"use client";

import { TeacherFormSchema } from "@/shared/schemas/TeacherFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CldUploadWidget } from "next-cloudinary";
import { useForm } from "react-hook-form";
import { InputField } from "./InputField";
import { FormProps } from "@/shared/types/types";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createTeacher } from "@/features/create/createTeacher/actions";
import { updateTeacher } from "@/features/update/updateTeacher/actions";
import Image from "next/image";
import {
  Loader2,
  UploadCloud,
  User,
  ShieldCheck,
  Contact,
  BookOpen,
  X,
} from "lucide-react";

export default function TeacherForm({
  type,
  setIsOpen,
  data,
  relatedData,
}: FormProps) {
  const { subjects } = relatedData ?? {};
  const [profileImage, setProfileImage] = useState<any>(data?.img || null);

  const actionToExecute = type === "create" ? createTeacher : updateTeacher;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(TeacherFormSchema),
    defaultValues: data,
  });

  const [state, formAction, isPending] = useActionState(actionToExecute, {
    success: false,
    error: false,
  });

  useEffect(() => {
    if (state.success) {
      toast.success(
        `Teacher ${type === "create" ? "created" : "updated"} successfully`,
      );
      setIsOpen(false);
    } else if (state.error) {
      toast.error(
        typeof state.error === "string"
          ? state.error
          : "Failed to save details",
      );
    }
  }, [state, type, setIsOpen]);

  const onSubmit = handleSubmit((formData) => {
    startTransition(() => {
      formAction({ ...formData, image: profileImage?.secure_url || data?.img });
    });
  });

  return (
    <form
      className="relative flex flex-col gap-0 overflow-hidden"
      onSubmit={onSubmit}
    >
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/80 pb-4 backdrop-blur-md">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            {type === "create" ? "Add New Teacher" : "Update Profile"}
          </h1>
          <p className="text-xs text-slate-500">
            BrightPath Academy Management System
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8">
        {/* Left Column: Avatar & Quick Info */}
        <div className="col-span-2 flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
          <h2 className="mb-4 self-start text-sm font-bold tracking-wider text-slate-400 uppercase">
            Teacher Photo
          </h2>

          <div className="group relative mb-4 h-32 w-32">
            <div className="h-full w-full overflow-hidden rounded-full border-4 border-slate-50 ring-1 ring-slate-200">
              <Image
                src={
                  profileImage?.secure_url || data?.img || "/icons/noAvatar.png"
                }
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <CldUploadWidget
            uploadPreset="brightpath_academy"
            onSuccess={(img, { widget }) => {
              setProfileImage(img.info);
              widget.close();
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
              >
                <UploadCloud size={18} />
                Change Image
              </button>
            )}
          </CldUploadWidget>
        </div>

        {/* Right Column: Fields */}
        <div className="col-span-2 space-y-10 pb-10">
          {/* Section: Auth */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-l-4 border-blue-600 pl-3">
              <ShieldCheck className="text-blue-600" size={20} />
              <h2 className="font-bold text-slate-800">Account Credentials</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputField
                label="Username"
                name="username"
                register={register}
                error={errors.username}
                type="text"
                placeholder="johndoe_edu"
              />
              <InputField
                label="Email Address"
                name="email"
                register={register}
                error={errors.email}
                type="email"
                placeholder="teacher@brightpath.com"
              />
              {type === "create" && (
                <div className="md:col-span-2">
                  <InputField
                    label="Temporary Password"
                    name="password"
                    register={register}
                    error={errors.password}
                    type="password"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Section: Personal */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-l-4 border-emerald-500 pl-3">
              <Contact className="text-emerald-500" size={20} />
              <h2 className="font-bold text-slate-800">Personal Details</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputField
                label="First Name"
                name="firstName"
                register={register}
                error={errors.firstName}
                type="text"
              />
              <InputField
                label="Last Name"
                name="lastName"
                register={register}
                error={errors.lastName}
                type="text"
              />
              <InputField
                label="Phone"
                name="phone"
                register={register}
                error={errors.phone}
                type="text"
              />
              <InputField
                label="Blood Group"
                name="bloodGroup"
                register={register}
                error={errors.bloodGroup}
                type="text"
                placeholder="O+"
              />
              <InputField
                label="Date of Birth"
                name="dateOfBirth"
                register={register}
                error={errors.dateOfBirth}
                type="date"
              />
              <InputField
                label="Current Address"
                name="address"
                register={register}
                error={errors.address}
                type="text"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Gender Identity
              </label>
              <div className="flex gap-4">
                {["male", "female"].map((g) => (
                  <label
                    key={g}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 transition-all hover:bg-slate-50 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50/50 has-[:checked]:text-blue-700"
                  >
                    <input
                      type="radio"
                      value={g}
                      {...register("gender")}
                      defaultChecked={data?.sex === g}
                      className="hidden"
                    />
                    <span className="text-sm font-bold capitalize">{g}</span>
                  </label>
                ))}
              </div>
              {errors.gender?.message && (
                <p className="text-xs text-red-500">
                  {errors.gender.message.toString()}
                </p>
              )}
            </div>
          </div>

          {/* Section: Professional */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-l-4 border-amber-500 pl-3">
              <BookOpen className="text-amber-500" size={20} />
              <h2 className="font-bold text-slate-800">Academic Assignment</h2>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Expertise Subjects
              </label>
              <select
                multiple
                {...register("subject")}
                defaultValue={data?.subjects}
                className="min-h-[120px] w-full rounded-xl border border-slate-200 bg-white p-2 text-sm transition-all focus:ring-4 focus:ring-blue-500/10"
              >
                {subjects?.map((subject: any) => (
                  <option
                    key={subject.id}
                    value={subject.id}
                    className="rounded-md p-2 checked:bg-blue-600 checked:text-white"
                  >
                    {subject.name}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-slate-400 italic">
                Hold Ctrl (Cmd) to select multiple subjects.
              </p>
              {errors.subject?.message && (
                <p className="text-xs text-red-500">
                  {errors.subject.message.toString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 mt-4 flex items-center justify-end gap-3 border-t border-slate-100 bg-white/90 py-4 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700"
        >
          Discard Changes
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex min-w-[160px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300 active:scale-95 disabled:bg-slate-300"
        >
          {isPending ? (
            <Loader2 className="animate-spin" size={20} />
          ) : type === "create" ? (
            "Register Teacher"
          ) : (
            "Save Profile"
          )}
        </button>
      </div>
    </form>
  );
}
