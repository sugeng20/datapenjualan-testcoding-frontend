"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps {
  link: string;
  children?: React.ReactNode;
}

const LinkComponent: React.FC<ButtonProps> = ({ children, link }) => {
  return (
    <>
      <Link
        href={link}
        className={`px-6 bg-blue-500 hover:bg-blue-700 text-white text-base font-bold py-4 mt-6 text-center rounded-xl`}
      >
        {children}
      </Link>
    </>
  );
};

export default LinkComponent;
