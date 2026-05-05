import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface InputFieldProps {
  label: string;
  type: string;
  register: any;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  name: string;
  defaultValue?: string;
  hidden?: boolean;
}

export const InputField = ({
  label,
  name,
  defaultValue,
  type,
  register,
  error,
  hidden,
}: InputFieldProps) => {
  return (
    <div className={`${hidden ? "hidden" : "flex w-full flex-col gap-1.5"}`}>
      <label
        htmlFor={name}
        className="ml-0.5 text-sm font-semibold text-slate-700"
      >
        {label}
      </label>
      <input
        type={type}
        {...register(name)}
        defaultValue={defaultValue}
        className={`w-full rounded-lg border bg-white px-4 py-2.5 transition-all duration-200 outline-none ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
            : "border-slate-200 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        } text-slate-600 placeholder:text-slate-400`}
      />
      {error?.message && (
        <p className="mt-1 ml-1 text-[12px] font-medium text-red-500">
          {(error.message as any).toString()}
        </p>
      )}
    </div>
  );
};
