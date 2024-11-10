"use client";

import IconSidebarComponent from "@/components/IconSidebarComponent";
import {
  faArchive,
  faCartShopping,
  faDashboard,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarComponent: React.FC = (): JSX.Element => {
  const itemSidebar = [
    {
      label: "Dashboard",
      icon: faDashboard,
      link: "/dashboard",
    },
    {
      label: "Jenis Barang",
      icon: faDatabase,
      link: "/type",
    },
    {
      label: "Barang",
      icon: faArchive,
      link: "/item",
    },
    {
      label: "Transaksi",
      icon: faCartShopping,
      link: "/transaction",
    },
  ];

  const pathName = usePathname();

  return (
    <>
      <div className="mt-8">
        {itemSidebar.map((item, index) => {
          return (
            <IconSidebarComponent
              key={index}
              label={item.label}
              icon={item.icon}
              link={item.link}
              active={pathName === item.link}
            />
          );
        })}
      </div>
    </>
  );
};

export default SidebarComponent;
