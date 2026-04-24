import { SubjectFormSchema } from "@/shared/schemas/SubjectFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { InputField } from "./InputField";
import { createSubject } from "@/lib/server.actions";

export default function SubjectForm({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SubjectFormSchema),
    defaultValues: data,
  });

  const onSubmit = handleSubmit(async (data) => {
    await createSubject(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-2xl font-bold">
        {type === "create" ? "Create a new Subject" : "Update Subject"}
      </h1>
      <span className="text-xs font-medium">Subject Information</span>
      <div className="flex flex-wrap justify-between gap-4">
        <InputField
          label="Subject Name"
          type="text"
          name="SubjectName"
          register={register}
          error={errors.SubjectName}
          defaultValue={data?.SubjectName}
        />
      </div>
      <button type="submit" className="">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}
