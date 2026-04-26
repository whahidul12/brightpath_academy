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

export default function TeacherForm({
  type,
  setIsOpen,
  data,
  relatedData,
}: FormProps) {
  const { subjects } = relatedData ?? {};
  const [profileImage, setProfileImage] = useState<any>();

  const actionToExecute = type === "create" ? createTeacher : updateTeacher;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(TeacherFormSchema),
    defaultValues: data, // Better way to handle defaults
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
          : "Failed to save Teacher Details",
      );
    }
  }, [state, type, setIsOpen]);

  const onSubmit = handleSubmit((formData) => {
    startTransition(() => {
      formAction({ ...formData, image: profileImage?.secure_url });
    });
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-2xl font-bold">
        {type === "create" ? "Create a new Teacher" : "Update Teacher"}
      </h1>
      <span className="text-xs font-medium">Authentication Information</span>
      <div className="flex flex-wrap justify-between gap-4">
        <InputField
          label="Username"
          type="text"
          name="username"
          register={register}
          error={errors.username}
          defaultValue={data?.username}
        />
        <InputField
          label="Email"
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
            defaultValue={data?.password}
          />
        )}
      </div>
      <span className="text-xs font-medium">Personal Information</span>
      <div className="flex flex-wrap justify-between gap-4">
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
          label="Phone"
          type="text"
          name="phone"
          register={register}
          error={errors.phone}
          defaultValue={data?.phone}
        />
        <InputField
          label="Address"
          type="text"
          name="address"
          register={register}
          error={errors.address}
          defaultValue={data?.address}
        />
        <InputField
          label="Blood Group"
          type="text"
          name="bloodGroup"
          register={register}
          error={errors.bloodGroup}
          defaultValue={data?.bloodType}
        />
        <InputField
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          register={register}
          error={errors.dateOfBirth}
          defaultValue={data?.birthday}
        />
        <div className="flex w-full flex-col gap-2 md:w-1/4">
          <label htmlFor="gender">Gender</label>
          <select
            {...register("gender")}
            defaultValue={data?.sex || ""}
            className="ring-1"
          >
            <option value="">Select One</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender?.message && (
            <p className="text-red-500">{errors.gender.message.toString()}</p>
          )}
        </div>
        <div className="flex w-full flex-col gap-2 md:w-1/4">
          <label htmlFor="subjects">Subjects</label>
          <select
            multiple
            {...register("subject")}
            defaultValue={data?.subjects}
            className="ring-1"
          >
            {subjects?.map((subject: any) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors.subject?.message && (
            <p className="text-red-500">{errors.subject.message.toString()}</p>
          )}
        </div>
        <CldUploadWidget
          uploadPreset="brightpath_academy"
          onSuccess={(img, { widget }) => {
            setProfileImage(img.info);
            widget.close();
          }}
        >
          {({ open }) => {
            return (
              <div
                onClick={() => open()}
                className="flex gap-2 hover:cursor-pointer"
              >
                <Image
                  src="/icons/upload.png"
                  alt="Upload Image"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
                Upload Image
              </div>
            );
          }}
        </CldUploadWidget>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="hover:cursor-pointer"
      >
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}
