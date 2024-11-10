"use client";

import Logo from "@/assets/logo.jpeg";
import Image from "next/image";
import Avatar from "@/assets/avatar/1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import SidebarComponent from "@/components/SidebarComponent";
import Logout from "@/components/Logout";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarActive, setSidebarActive] = React.useState(false);

  const handleSidebarActive = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <>
      <main className="flex">
        <aside
          className={`h-screen w-80 px-6 py-4 bg-white border rounded-lg absolute lg:relative lg:translate-x-0 overflow-hidden transition duration-500 ease-in-out z-10 ${
            sidebarActive ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex mt-5 items-center">
            <Image alt="Logo" className="w-16" src={Logo} />
            <FontAwesomeIcon
              onClick={handleSidebarActive}
              className={`ml-auto w-6 cursor-pointer ${
                sidebarActive ? "" : "hidden"
              }`}
              icon={faBars}
            />
          </div>

          <div className="w-full py-4 border mt-6 px-2 rounded-2xl flex items-center">
            <Image alt="Avatar" src={Avatar} className="w-16" />
            <div className="pl-2">
              <p className="text-sm">Hi, Selamat Datang</p>
              <p className="text-base font-bold">Admin Sugeng</p>
            </div>
          </div>

          <SidebarComponent />
        </aside>

        <div className="w-full px-6">
          <div className="max-h-[10vh] bg-[#F6F6F6]">
            <div className="py-6 flex items-center">
              <div className="mr-4 lg:hidden">
                <FontAwesomeIcon
                  onClick={handleSidebarActive}
                  icon={faBars}
                  className="w-6 cursor-pointer"
                />
              </div>
              <h1 className="text-xl md:text-4xl">
                {process.env.NEXT_PUBLIC_APP_NAME}
              </h1>
              <Logout />
            </div>
          </div>
          <div className="max-h-[90vh] overflow-y-auto no-scrollbar">
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminLayout;
