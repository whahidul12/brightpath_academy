"use client";

import { ParentFormSchema } from "@/shared/schemas/ParentFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CldUploadWidget } from "next-cloudinary";
import { useForm } from "react-hook-form";
import { InputField } from "./InputField";
import { FormProps } from "@/shared/types/types";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createParent } from "@/features/create/createParent/actions";
import { updateParent } from "@/features/update/updateParent/actions";
import Image from "next/image";
import {
  User,
  Lock,
  Mail,
  Phone,
  MapPin,
  UploadCloud,
  Loader2,
  Save,
  XCircle,
} from "lucide-react";

export default function ParentForm({
  type,
  setIsOpen,
  data,
  relatedData,
}: FormProps) {
  // Initialize profile image with existing data if updating
  const [profileImage, setProfileImage] = useState<any>(data?.img || null);

  const actionToExecute = type === "create" ? createParent : updateParent;

  const formSchema =
    type === "create"
      ? ParentFormSchema.required({ password: true })
      : ParentFormSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: data,
  });

  const [state, formAction, isPending] = useActionState(actionToExecute, {
    success: false,
    error: false,
  });

  useEffect(() => {
    if (state.success) {
      toast.success(
        `Parent ${type === "create" ? "created" : "updated"} successfully`,
        {
          description: "The record has been synchronized with the database.",
        },
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
      formAction({
        ...formData,
        image: profileImage?.secure_url || profileImage,
      });
    });
  });

  return (
    <form className="flex flex-col gap-10 p-1" onSubmit={onSubmit}>
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {type === "create" ? "Add New Parent" : "Edit Parent Profile"}
        </h1>
        <p className="text-sm text-slate-500">
          Set up account credentials and personal contact information.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section: Media/Upload */}
        <div className="grid grid-cols-1 gap-6">
          <div className="md:col-span-1">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <UploadCloud className="h-4 w-4 text-blue-600" />
              Profile Photo
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Recommended size 400x400px.
            </p>
          </div>

          <div className="col-span-2 flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
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
          {/* Section: Authentication */}
          <div className="grid grid-cols-1 gap-6">
            <div className="md:col-span-1">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Lock className="h-4 w-4 text-blue-600" />
                Account Security
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Credentials used for system access.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-2">
              <InputField
                label="Username"
                type="text"
                name="username"
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
                <div className="sm:col-span-2">
                  <InputField
                    label="Password"
                    type="password"
                    name="password"
                    register={register}
                    error={errors.password}
                  />
                </div>
              )}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Personal Information */}
          <div className="grid grid-cols-1 gap-6">
            <div className="md:col-span-1">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <User className="h-4 w-4 text-blue-600" />
                Contact Details
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Primary contact information for school-home communication.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-2">
              <InputField
                label="First Name"
                type="text"
                name="firstName"
                register={register}
                error={errors.firstName}
                defaultValue={data?.name}
              />
              <InputField
                label="Last Name"
                type="text"
                name="lastName"
                register={register}
                error={errors.lastName}
                defaultValue={data?.surname}
              />
              <InputField
                label="Phone Number"
                type="text"
                name="phone"
                register={register}
                error={errors.phone}
                defaultValue={data?.phone}
              />
              <InputField
                label="Home Address"
                type="text"
                name="address"
                register={register}
                error={errors.address}
                defaultValue={data?.address}
              />
            </div>
          </div>

          <hr className="border-slate-100" />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-[0.98] disabled:bg-blue-400"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>
                {type === "create" ? "Create Parent" : "Update Profile"}
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
