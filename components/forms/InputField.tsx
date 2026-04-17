import { FieldError } from "react-hook-form";

export const InputField = ({
  label,
  name,
  defaultValue,
  type,
  register,
  error,
}: {
  label: string;
  type: string;
  register: any;
  error?: FieldError;
  name: string;
  defaultValue?: string;
}) => {
  return (
    <div className="flex w-full flex-col gap-2 md:w-1/4">
      <label htmlFor="username">{label}</label>
      <input
        type={type}
        {...register(name)}
        defaultValue={defaultValue}
        className="ring-1"
      />
      {error?.message && (
        <p className="text-red-500">{error.message.toString()}</p>
      )}
    </div>
  );
};
