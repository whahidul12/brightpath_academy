import { TeacherFormSchema } from "@/shared/schemas/products";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { InputField } from "./InputField";

export const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(TeacherFormSchema),
    defaultValues: data, // Better way to handle defaults
  });

  const onSubmit = handleSubmit((values) => {
    console.log(values);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-2xl font-bold">Create a new Teacher</h1>
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
          label="email"
          type="email"
          name="email"
          register={register}
          error={errors.email}
          defaultValue={data?.email}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          register={register}
          error={errors.password}
          defaultValue={data?.password}
        />
      </div>
      <span className="text-xs font-medium">Personal Information</span>
      <div className="flex flex-wrap justify-between gap-4">
        <InputField
          label="First Name"
          type="text"
          name="firstName"
          register={register}
          error={errors.firstName}
          defaultValue={data?.firstName}
        />
        <InputField
          label="Last Name"
          type="text"
          name="lastName"
          register={register}
          error={errors.lastName}
          defaultValue={data?.lastName}
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
          defaultValue={data?.bloodGroup}
        />
        <InputField
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          register={register}
          error={errors.dateOfBirth}
          defaultValue={data?.dateOfBirth}
        />
        <div className="flex w-full flex-col gap-2 md:w-1/4">
          <label htmlFor="gender">Gender</label>
          <select
            {...register("gender")}
            defaultValue={data?.gender}
            className="ring-1"
          >
            <option selected value="default gender">
              Select One
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender?.message && (
            <p className="text-red-500">{errors.gender.message.toString()}</p>
          )}
        </div>
        <div className="flex w-full flex-col justify-end gap-2 p-2 ring-1 md:w-1/4">
          <label htmlFor="image" className="flex gap-2 hover:cursor-pointer">
            {" "}
            <Image
              src="/icons/upload.png"
              alt="Upload Image"
              width={24}
              height={24}
              className="h-6 w-6"
            />
            Upload Image
          </label>
          <input
            {...register("image")}
            type="file"
            id="image"
            className="hidden ring-1"
          />
          {errors.image?.message && (
            <p className="text-red-500">{errors.image.message.toString()}</p>
          )}
        </div>
      </div>
      <button type="submit" className="">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};
