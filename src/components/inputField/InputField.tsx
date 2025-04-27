import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputFieldProps<T extends string | number> {
  id: string;
  label?: string;
  className?: string;
  error?: string;
  placeHolder?: string;
  disabled?: boolean;
  required?: boolean;
  value?: T;
  defaultValue?: T;
  readOnly?: boolean;
  type?: React.HTMLInputTypeAttribute;
}

const InputField = forwardRef<
  HTMLInputElement,
  InputFieldProps<string | number>
>(
  (
    {
      id,
      label,
      className,
      error,
      disabled,
      required,
      placeHolder,
      readOnly = false,
      type = "text",
      ...rest
    },
    ref
  ) => {
    return (
      <div
        className={twMerge(
          "flex flex-col w-full px-0 gap-y-2 text-sm",
          className
        )}
      >
        {label && (
          <label
            htmlFor={id}
            className='pl-2 text-primary-text font-medium text-sm'
          >
            {label}
          </label>
        )}
        <div className='relative w-full'>
          <input
            id={id}
            className={`w-full border border-slate-200 bg-[#f9f9f9f3] shadow-sm 
              placeholder:text-slate-400 px-4 text-xs py-2 rounded-md focus:outline-gray-300
              ${error && "outline-red-600"}`}
            ref={ref}
            type={type}
            disabled={disabled}
            required={required}
            readOnly={readOnly}
            placeholder={placeHolder}
            {...rest}
          />
          {error && (
            <p className='text-red-600 text-xxs pl-2 top-full left-0 mt-1'>
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
