"use client";

import { StudentFormSchema } from "@/shared/schemas/StudentFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CldUploadWidget } from "next-cloudinary";
import { useForm } from "react-hook-form";
import { InputField } from "./InputField";
import { FormProps } from "@/shared/types/types";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createStudent } from "@/features/create/createStudent/actions";
import { updateStudent } from "@/features/update/updateStudent/actions";
import Image from "next/image";
import {
  User,
  Lock,
  UserCircle,
  Droplets,
  Users,
  GraduationCap,
  UploadCloud,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function StudentForm({
  type,
  setIsOpen,
  data,
  relatedData,
}: FormProps) {
  const { parents, grades, classes } = relatedData ?? {};
  const [profileImage, setProfileImage] = useState<any>(data?.img || null);

  const actionToExecute = type === "create" ? createStudent : updateStudent;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(StudentFormSchema),
    defaultValues: data,
  });

  const [state, formAction, isPending] = useActionState(actionToExecute, {
    success: false,
    error: false,
  });

  useEffect(() => {
    if (state.success) {
      toast.success(
        `Student ${type === "create" ? "created" : "updated"} successfully`,
      );
      setIsOpen(false);
    } else if (state.error) {
      toast.error(
        typeof state.error === "string"
          ? state.error
          : "Failed to save Student Details",
      );
    }
  }, [state, type, setIsOpen]);

  const onSubmit = handleSubmit((formData) => {
    startTransition(() => {
      formAction({
        ...formData,
        image: profileImage?.secure_url || profileImage,
      });
    });
  });

  // Common styles for select inputs to keep code DRY
  const selectStyles = `w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition-all hover:border-slate-300 cursor-pointer`;

  const labelStyles =
    "text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2";

  return (
    <form
      className="mx-auto flex max-w-5xl flex-col gap-10 p-2 sm:p-4"
      onSubmit={onSubmit}
    >
      {/* HEADER */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {type === "create" ? "Add New Student" : "Edit Student Profile"}
        </h1>
        <p className="text-sm text-slate-500">
          {type === "create"
            ? "Create a new student record and account."
            : "Update existing student information and settings."}
        </p>
      </div>
      <div className="col-span-2 flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
        <h2 className="mb-4 self-start text-sm font-bold tracking-wider text-slate-400 uppercase">
          Student Photo
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

      {/* SECTION: AUTHENTICATION */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <Lock className="h-4 w-4 text-blue-600" />
          <h2 className="text-sm font-bold tracking-wider text-slate-400 uppercase">
            Authentication
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <InputField
            label="Username"
            name="username"
            type="text"
            register={register}
            error={errors.username}
            defaultValue={data?.username}
          />
          <InputField
            label="Email Address"
            type="email"
            name="email"
            register={register}
            error={errors.email}
            defaultValue={data?.email}
          />
          {type === "create" && (
            <InputField
              label="Password"
              type="password"
              name="password"
              register={register}
              error={errors.password}
            />
          )}
        </div>
      </section>

      {/* SECTION: PERSONAL INFORMATION */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <UserCircle className="h-4 w-4 text-blue-600" />
          <h2 className="text-sm font-bold tracking-wider text-slate-400 uppercase">
            Personal Details
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <InputField
            label="First Name"
            name="firstName"
            type="text"
            register={register}
            error={errors.firstName}
            defaultValue={data?.name}
          />
          <InputField
            label="Last Name"
            name="lastName"
            type="text"
            register={register}
            error={errors.lastName}
            defaultValue={data?.surname}
          />
          <InputField
            label="Phone Number"
            name="phone"
            type="text"
            register={register}
            error={errors.phone}
            defaultValue={data?.phone}
          />

          <div className="lg:col-span-2">
            <InputField
              label="Home Address"
              name="address"
              type="text"
              register={register}
              error={errors.address}
              defaultValue={data?.address}
            />
          </div>

          <InputField
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            register={register}
            error={errors.dateOfBirth}
            defaultValue={data?.birthday}
          />

          <div className="flex flex-col">
            <label className={labelStyles}>
              <User className="h-4 w-4" /> Gender
            </label>
            <select
              {...register("gender")}
              defaultValue={data?.sex || ""}
              className={selectStyles}
            >
              <option value="">Select One</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.gender.message.toString()}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className={labelStyles}>
              <Droplets className="h-4 w-4 text-red-500" /> Blood Group
            </label>
            <select
              {...register("bloodGroup")}
              defaultValue={data?.bloodType || ""}
              className={selectStyles}
            >
              <option value="">Select One</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* SECTION: ACADEMIC */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <GraduationCap className="h-4 w-4 text-blue-600" />
          <h2 className="text-sm font-bold tracking-wider text-slate-400 uppercase">
            Institutional
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col">
            <label className={labelStyles}>
              <Users className="h-4 w-4" /> Parent/Guardian
            </label>
            <select
              {...register("parentId")}
              defaultValue={data?.parentId || ""}
              className={selectStyles}
            >
              <option value="">Select Parent</option>
              {parents?.map((p: any) => (
                <option key={p.id} value={p.id}>
                  {p.name} {p.surname}
                </option>
              ))}
            </select>
            {errors.parentId?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.parentId.message.toString()}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className={labelStyles}>Grade Level</label>
            <select
              {...register("gradeId")}
              defaultValue={data?.gradeId || ""}
              className={selectStyles}
            >
              <option value="">Select Grade</option>
              {grades?.map((g: any) => (
                <option key={g.id} value={g.id}>
                  {g.level}
                </option>
              ))}
            </select>
            {errors.gradeId?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.gradeId.message.toString()}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className={labelStyles}>Class Assigned</label>
            <select
              {...register("classId")}
              defaultValue={data?.classId || ""}
              className={selectStyles}
            >
              <option value="">Select Class</option>
              {classes?.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.classId?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.classId.message.toString()}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER ACTIONS */}
      <div className="mt-6 flex flex-col-reverse items-center justify-end gap-3 border-t border-slate-100 pt-8 sm:flex-row">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="w-full rounded-lg px-6 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 sm:w-auto"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-2.5 font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none sm:w-auto"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4" />
              <span>
                {type === "create" ? "Create Student" : "Save Changes"}
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
