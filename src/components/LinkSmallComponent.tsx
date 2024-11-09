"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ButtonProps {
  link: string;
  children?: React.ReactNode;
  icon: IconProp;
  color: "blue" | "red" | "green";
}

const LinkSmallComponent: React.FC<ButtonProps> = ({
  children,
  link,
  icon,
  color,
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
    <>
      <Link
        href={link}
        className={`py-1 px-4 text-white text-base rounded-xl ${classColor} mr-2`}
      >
        <FontAwesomeIcon icon={icon} className="mr-1" />
        {children}
      </Link>
    </>
  );
};

export default LinkSmallComponent;
