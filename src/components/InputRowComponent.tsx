import React from "react";

interface InputProps {
  label: string;
  type: "text" | "password" | "email" | "number" | "date";
  placeholder: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  required?: boolean;
}

const InputRowComponent: React.FC<InputProps> = ({
  label,
  type,
  placeholder,
  id,
  onChange,
  value,
  required,
}) => {
  return (
    <>
      <div className="mb-3 grid grid-cols-1 md:grid-cols-12  items-center">
        <label className="text-sm md:col-span-2" htmlFor={id}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="mt-2 md:col-span-10">
          <input
            type={type}
            placeholder={placeholder}
            id={id}
            className="py-4 px-2 text-sm w-full border border-gray-300 rounded-xl"
            onChange={onChange}
            value={value}
            required={required}
          />
        </div>
      </div>
    </>
  );
};

export default InputRowComponent;
