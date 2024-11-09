import React from "react";

interface InputProps {
  label: string;
  placeholder: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  required?: boolean;
}

const TextareaRowComponent: React.FC<InputProps> = ({
  label,
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
          <textarea
            placeholder={placeholder}
            id={id}
            className="px-2 py-4 text-sm w-full border border-gray-300 rounded-xl"
            onChange={onChange}
            required={required}
            value={value}
          />
        </div>
      </div>
    </>
  );
};

export default TextareaRowComponent;
