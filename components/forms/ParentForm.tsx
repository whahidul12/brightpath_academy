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
        {/* Section: Authentication */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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

        {/* Section: Media/Upload */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <UploadCloud className="h-4 w-4 text-blue-600" />
              Profile Photo
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Recommended size 400x400px.
            </p>
          </div>

          <div className="md:col-span-2">
            <CldUploadWidget
              uploadPreset="brightpath_academy"
              onSuccess={(img, { widget }) => {
                setProfileImage(img.info);
                widget.close();
              }}
            >
              {({ open }) => (
                <div
                  onClick={() => open()}
                  className="group flex cursor-pointer items-center gap-6 rounded-xl border-2 border-dashed border-slate-200 p-4 transition-all hover:border-blue-400 hover:bg-blue-50/30"
                >
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-white bg-slate-100 shadow-sm">
                    {profileImage ? (
                      <Image
                        src={
                          typeof profileImage === "string"
                            ? profileImage
                            : profileImage.secure_url
                        }
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-400">
                        <User className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 transition-colors group-hover:text-blue-700">
                      {profileImage ? "Change photo" : "Upload profile picture"}
                    </p>
                    <p className="text-xs text-slate-500">JPG, PNG or WebP</p>
                  </div>
                </div>
              )}
            </CldUploadWidget>
          </div>
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
