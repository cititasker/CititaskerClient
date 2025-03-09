"use client";
import { defaultProfile } from "@/constant/images";
import { useAppSelector } from "@/store/hook";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import Icons from "../Icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { initializeName } from "@/utils";

const data = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Icons.grid,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: Icons.user,
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
    href: "/dashboard/settings",
    icon: Icons.settings,
  },
];

const DashboardSidebar = () => {
  const { user } = useAppSelector((state) => state.user);
  const pathname = usePathname();

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
      <div className="">
        {data.map((el) => (
          <Link
            key={el.href}
            href={el.href}
            className={`flex gap-3 h-[59px] items-center pl-[50px] border-r-2 cursor-pointer ${
              pathname == el.href
                ? "border-primary bg-light-primary-1"
                : "border-transparent"
            }`}
          >
            <el.icon />
            <Typography>{el.name}</Typography>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardSidebar;
