"use client";
import { defaultProfile } from "@/constant/images";
import { useAppSelector } from "@/store/hook";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import Icons from "../Icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { initializeName } from "@/utils";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ROUTES } from "@/constant";

interface MenuItem {
  name: string;
  href?: string;
  icon: any;
  children?: MenuItem[];
}

const data = [
  {
    name: "Dashboard",
    href: ROUTES.DASHBOARD,
    icon: Icons.grid,
  },
  {
    name: "Message",
    href: "/dashboard/message",
    icon: Icons.chat,
  },
  {
    name: "Payment & Billing",
    href: "/dashboard/payment",
    icon: Icons.creditCard,
  },
  {
    name: "Notification",
    href: "/dashboard/notification",
    icon: Icons.notificationBell,
  },
  {
    name: "Settings",
    icon: Icons.settings,
    children: [
      {
        name: "Account",
        href: "/dashboard/settings",
        icon: Icons.grid,
      },
      {
        name: "Profile",
        href: "/profile",
        icon: Icons.profileCircle,
      },
    ],
  },
];

const DashboardSidebar = () => {
  const { user } = useAppSelector((state) => state.user);
  const pathname = usePathname();
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});

  const handleClick = (key: string) => {
    setOpenSubMenus((prevOpenSubMenus) => ({
      ...prevOpenSubMenus,
      [key]: !prevOpenSubMenus[key],
    }));
  };

  const renderSubMenu = (submenuItems: MenuItem[], parentKey: string) => (
    <Collapse in={openSubMenus[parentKey]} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {submenuItems.map((submenuItem: MenuItem, subIndex: number) => {
          const key = `${parentKey}-${subIndex}`;
          return (
            <React.Fragment key={key}>
              <ListItem
                component={submenuItem.href ? Link : "div"}
                key={submenuItem.href}
                href={submenuItem.href}
                className={`flex gap-3 h-[59px] items-center pl-[70px] border-r-2 cursor-pointer ${
                  pathname == submenuItem.href
                    ? "border-primary bg-light-primary-1"
                    : "border-transparent"
                }`}
              >
                <submenuItem.icon />
                <Typography>{submenuItem.name}</Typography>
              </ListItem>
              {submenuItem.children && renderSubMenu(submenuItem.children, key)}
            </React.Fragment>
          );
        })}
      </List>
    </Collapse>
  );

  return (
    <div className="paper max-w-[300px] w-full h-fit overflow-hidden">
      <div className="px-5 pb-5 pt-6 border-b-[0.8px] border-light-grey flex flex-col items-center mb-[30px]">
        <Image
          src={user.profile_image ?? defaultProfile}
          alt="user profile"
          className="w-[100px] h-[100px] rounded-full mb-2 object-cover"
          width={100}
          height={100}
        />
        <Typography className="capitalise text-xl text-black font-medium">
          {initializeName({
            first_name: user.first_name,
            last_name: user.last_name,
          })}
        </Typography>
      </div>
      <List component="nav" disablePadding>
        {data.map((el, i) => {
          const key = `${i}`;
          if (el?.children) {
            return (
              <Fragment key={key}>
                <ListItemButton
                  key={key}
                  onClick={() => handleClick(key)}
                  className={`flex gap-3 h-[59px] items-center pl-[50px] border-r-2 cursor-pointer ${
                    pathname == el.href
                      ? "border-primary bg-light-primary-1"
                      : "border-transparent"
                  }`}
                >
                  <div className="flex gap-3 items-center flex-1">
                    <el.icon />
                    <ListItemText>{el.name}</ListItemText>
                  </div>
                  <ListItemIcon>
                    <Icons.dropdown
                      width={20}
                      height={20}
                      className={`${
                        openSubMenus[key] ? "rotate-180" : "rotate-0"
                      } transition-all`}
                    />
                  </ListItemIcon>
                </ListItemButton>
                {el.children && renderSubMenu(el.children, key)}
              </Fragment>
            );
          } else
            return (
              <ListItem
                component={Link}
                key={key}
                href={el.href}
                className={`flex gap-3 h-[59px] items-center pl-[50px] border-r-2 cursor-pointer ${
                  pathname == el.href
                    ? "border-primary bg-light-primary-1"
                    : "border-transparent"
                }`}
              >
                <el.icon />
                <Typography>{el.name}</Typography>
              </ListItem>
            );
        })}
      </List>
    </div>
  );
};

export default DashboardSidebar;
