"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface ButtonProps {
  label: string;
  type: "button" | "submit" | "reset" | undefined;
  loading?: boolean;
  onClick?: () => void;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  label,
  type,
  loading,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`px-6 ${
        loading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-700"
      } text-white text-base font-bold py-4 px-2 mt-6 flex justify-center rounded-xl`}
      disabled={loading}
      onClick={onClick}
    >
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-2xl" />
      ) : (
        label
      )}
    </button>
  );
};

export default ButtonComponent;
