"use client";

import React, { useState } from "react";
import { List } from "@mui/material";
import UserProfile from "./UserProfile";
import SidebarMenuItem from "./SidebarMenuItem";
import { menuData } from "../../../../data";

interface IProps {
  role: TRole;
}

const DashboardSidebar = ({ role }: IProps) => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="paper max-w-[300px] w-full h-fit overflow-hidden sticky top-0">
      <UserProfile />
      <List disablePadding>
        {menuData.map((item, index) => (
          <SidebarMenuItem
            key={index}
            item={item}
            role={role}
            menuKey={String(index)}
            openMenus={openMenus}
            toggleMenu={toggleMenu}
          />
        ))}
      </List>
    </div>
  );
};

export default DashboardSidebar;
