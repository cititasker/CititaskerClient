"use client";

import React, { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Icons from "@/components/Icons";

interface MenuItemProps {
  item: {
    name: string;
    href?: string;
    icon: any;
    children?: MenuItemProps["item"][];
  };
  level?: number;
  openMenus: Record<string, boolean>;
  toggleMenu: (key: string) => void;
  menuKey: string;
  role: TRole;
}

const SidebarMenuItem = ({
  item,
  level = 0,
  openMenus,
  toggleMenu,
  menuKey,
  role,
}: MenuItemProps) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(`/${role}${item.href}`);
  const hasChildren = !!item.children;

  const paddingLeft = level === 0 ? "pl-[50px]" : "pl-[70px]";
  const classes = `flex gap-3 h-[59px] items-center ${paddingLeft} border-r-2 cursor-pointer ${
    isActive ? "border-primary bg-light-primary-1" : "border-transparent"
  }`;

  if (hasChildren) {
    return (
      <Fragment key={menuKey}>
        <ListItemButton onClick={() => toggleMenu(menuKey)} className={classes}>
          <div className="flex gap-3 items-center flex-1">
            <item.icon />
            <ListItemText>{item.name}</ListItemText>
          </div>
          <ListItemIcon>
            <Icons.dropdown
              width={20}
              height={20}
              className={`transition-all ${
                openMenus[menuKey] ? "rotate-180" : "rotate-0"
              }`}
            />
          </ListItemIcon>
        </ListItemButton>
        <Collapse in={openMenus[menuKey]} timeout="auto" unmountOnExit>
          <List disablePadding>
            {(item.children ?? []).map((child, index) => (
              <SidebarMenuItem
                key={`${menuKey}-${index}`}
                item={child}
                level={level + 1}
                openMenus={openMenus}
                toggleMenu={toggleMenu}
                menuKey={`${menuKey}-${index}`}
                role={role}
              />
            ))}
          </List>
        </Collapse>
      </Fragment>
    );
  }

  return (
    <ListItem
      component={Link}
      href={`/${role}${item.href ?? "#"}`}
      className={classes}
    >
      <item.icon />
      <Typography>{item.name}</Typography>
    </ListItem>
  );
};

export default SidebarMenuItem;
