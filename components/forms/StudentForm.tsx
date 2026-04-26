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

export default function StudentForm({
  type,
  setIsOpen,
  data,
  relatedData,
}: FormProps) {
  const { parents, grades, classes } = relatedData ?? {};
  const [profileImage, setProfileImage] = useState<any>();

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
      formAction({ ...formData, image: profileImage?.secure_url });
    });
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-2xl font-bold">
        {type === "create" ? "Create a new Student" : "Update Student"}
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
          <label htmlFor="bloodGroup">Blood Group</label>
          <select
            {...register("bloodGroup")}
            defaultValue={data?.bloodType || ""}
            className="ring-1"
          >
            <option value="">Select One</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          {errors.bloodGroup?.message && (
            <p className="text-red-500">
              {errors.bloodGroup.message.toString()}
            </p>
          )}
        </div>
        <div className="flex w-full flex-col gap-2 md:w-1/4">
          <label htmlFor="parentId">Parent</label>
          <select
            {...register("parentId")}
            defaultValue={data?.parentId || ""}
            className="ring-1"
          >
            <option value="">Select Parent</option>
            {parents?.map((parent: any) => (
              <option key={parent.id} value={parent.id}>
                {parent.name} {parent.surname}
              </option>
            ))}
          </select>
          {errors.parentId?.message && (
            <p className="text-red-500">{errors.parentId.message.toString()}</p>
          )}
        </div>
        <div className="flex w-full flex-col gap-2 md:w-1/4">
          <label htmlFor="gradeId">Grade</label>
          <select
            {...register("gradeId")}
            defaultValue={data?.gradeId || ""}
            className="ring-1"
          >
            <option value="">Select Grade</option>
            {grades?.map((grade: any) => (
              <option key={grade.id} value={grade.id}>
                {grade.level}
              </option>
            ))}
          </select>
          {errors.gradeId?.message && (
            <p className="text-red-500">{errors.gradeId.message.toString()}</p>
          )}
        </div>
        <div className="flex w-full flex-col gap-2 md:w-1/4">
          <label htmlFor="classId">Class</label>
          <select
            {...register("classId")}
            defaultValue={data?.classId || ""}
            className="ring-1"
          >
            <option value="">Select Class</option>
            {classes?.map((classItem: any) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>
          {errors.classId?.message && (
            <p className="text-red-500">{errors.classId.message.toString()}</p>
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
