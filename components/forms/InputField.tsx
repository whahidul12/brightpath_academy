import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export const InputField = ({
  label,
  name,
  defaultValue,
  type,
  register,
  error,
  hidden,
}: {
  label: string;
  type: string;
  register: any;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  name: string;
  defaultValue?: string;
  hidden?: boolean;
}) => {
  return (
    <div
      className={`${hidden ? "hidden" : "flex w-full flex-col gap-2 md:w-1/4"}`}
    >
      <label htmlFor="username">{label}</label>
      <input
        type={type}
        {...register(name)}
        defaultValue={defaultValue}
        className="ring-1"
      />
      {error?.message && (
        <p className="text-xs text-red-500">
          {(error.message as any).toString()}
        </p>
      )}
    </div>
  );
};
