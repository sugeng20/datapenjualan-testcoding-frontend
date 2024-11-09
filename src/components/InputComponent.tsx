import React from "react";

interface InputProps {
  label: string;
  type: "text" | "password" | "email" | "number";
  placeholder: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const InputComponent: React.FC<InputProps> = ({
  label,
  type,
  placeholder,
  id,
  onChange,
  value,
}) => {
  return (
    <>
      <div className="mb-3">
        <label className="text-sm" htmlFor={id}>
          {label}
        </label>
        <div className="mt-2">
          <input
            type={type}
            placeholder={placeholder}
            id={id}
            className="py-4 px-2 text-sm w-full border border-gray-300 rounded-xl"
            onChange={onChange}
            value={value}
          />
        </div>
      </div>
    </>
  );
};

export default InputComponent;
