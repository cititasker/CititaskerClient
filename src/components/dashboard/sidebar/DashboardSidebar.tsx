"use client";

import React, { useState } from "react";
import UserProfile from "./UserProfile";
import SidebarMenuItem from "./SidebarMenuItem";
import { menuData } from "../../../../data";
import { Card } from "@/components/ui/card";

interface IProps {
  role: TRole;
}

const DashboardSidebar = ({ role }: IProps) => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Card className="hidden sm:block max-w-[300px] w-fit md:w-full h-fit overflow-hidden sticky top-0">
      <UserProfile />
      <div>
        {menuData.map((item, index) => (
          <SidebarMenuItem
            key={index}
            item={item}
            role={role}
            openMenus={openMenus}
            toggleMenu={toggleMenu}
          />
        ))}
      </div>
    </Card>
  );
};

export default DashboardSidebar;
