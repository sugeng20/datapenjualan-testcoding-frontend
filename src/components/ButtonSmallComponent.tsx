"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  loading?: boolean;
  onClick?: () => void;
  color: "blue" | "red" | "green";
  children?: React.ReactNode;
  icon: IconProp;
}

const ButtonSmallComponent: React.FC<ButtonProps> = ({
  type,
  loading,
  onClick,
  color,
  children,
  icon,
}) => {
  let classColor = "";
  if (color === "blue") {
    classColor = "bg-blue-500 hover:bg-blue-700";
  } else if (color === "red") {
    classColor = "bg-red-500 hover:bg-red-700";
  } else if (color === "green") {
    classColor = "bg-green-500 hover:bg-green-700";
  }

  return (
    <button
      type={type}
      className={`py-2 px-4 text-white text-base rounded-xl ${classColor} mr-2`}
      disabled={loading}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} className="mr-1" />
      {children}
    </button>
  );
};

export default ButtonSmallComponent;
