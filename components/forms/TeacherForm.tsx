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
import { Loader2, UploadCloud } from "lucide-react"; // Assuming lucide-react is available

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
    <form className="mx-auto max-w-5xl space-y-8 p-2" onSubmit={onSubmit}>
      {/* Header Section */}
      <div className="border-b border-slate-100 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          {type === "create" ? "Create New Teacher" : "Edit Teacher Profile"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Fill in the information below to {type} the teacher account.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* top Column: Profile Image & Actions */}
        <div className="space-y-6 lg:col-span-1">
          <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
            <h2 className="mb-4 self-start text-sm font-bold tracking-wider text-slate-400 uppercase">
              Profile Photo
            </h2>

            <div className="group relative mb-4 h-32 w-32">
              <div className="h-full w-full overflow-hidden rounded-full border-4 border-slate-50 ring-1 ring-slate-200">
                <Image
                  src={
                    profileImage?.secure_url ||
                    data?.img ||
                    "/icons/noAvatar.png"
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
        </div>
        {/* bottom Column: Form Fields */}
        <div className="space-y-8 md:col-span-2">
          {/* Section: Authentication */}
          <section className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-6">
            <h2 className="text-sm font-bold tracking-wider text-slate-400 uppercase">
              Authentication Details
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputField
                label="Username"
                name="username"
                register={register}
                error={errors.username}
                type="text"
              />
              <InputField
                label="Email Address"
                name="email"
                register={register}
                error={errors.email}
                type="email"
              />
              {type === "create" && (
                <InputField
                  label="Password"
                  name="password"
                  register={register}
                  error={errors.password}
                  type="password"
                />
              )}
            </div>
          </section>

          {/* Section: Personal Info */}
          <section className="space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold tracking-wider text-slate-400 uppercase">
              Personal Information
            </h2>
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
                label="Phone Number"
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
              />
              <InputField
                label="Date of Birth"
                name="dateOfBirth"
                register={register}
                error={errors.dateOfBirth}
                type="date"
              />
              <InputField
                label="Address"
                name="address"
                register={register}
                error={errors.address}
                type="text"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2">
              {/* Gender Select */}
              <div className="flex flex-col gap-1.5">
                <label className="ml-0.5 text-sm font-semibold text-slate-700">
                  Gender
                </label>
                <select
                  {...register("gender")}
                  defaultValue={data?.sex || ""}
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-2.5 transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender?.message && (
                  <p className="text-[12px] text-red-500">
                    {errors.gender.message.toString()}
                  </p>
                )}
              </div>

              {/* Subjects Multiple Select */}
              <div className="flex flex-col gap-1.5">
                <label className="ml-0.5 text-sm font-semibold text-slate-700">
                  Assigned Subjects
                </label>
                <select
                  multiple
                  {...register("subject")}
                  defaultValue={data?.subjects}
                  className="min-h-[100px] w-full rounded-lg border border-slate-200 bg-white px-4 py-2 transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                >
                  {subjects?.map((subject: any) => (
                    <option key={subject.id} value={subject.id} className="p-1">
                      {subject.name}
                    </option>
                  ))}
                </select>
                {errors.subject?.message && (
                  <p className="text-[12px] text-red-500">
                    {errors.subject.message.toString()}
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 font-bold text-white shadow-lg shadow-slate-200 transition-all hover:bg-slate-800 disabled:bg-slate-400"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Saving...
              </>
            ) : type === "create" ? (
              "Create Teacher"
            ) : (
              "Update Details"
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 font-semibold text-slate-600 transition-all hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
