"use client";

import Image from "next/image";
import Link from "next/link";
import { MdOutlineMessage } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { defaultProfile } from "@/constant/images";
import { ROLE, ROUTES } from "@/constant";
import { loggedInUser } from "@/utils";
import { profileMenu } from "../../../data";
import Icons from "../Icons";
import FormButton from "../forms/FormButton";
import { useEffect, useState } from "react";

interface Props {
  user: Partial<IUser>;
  onLogout: () => void;
}

const UserActions = ({ user, onLogout }: Props) => {
  const [menu, setMenu] = useState(profileMenu);

  useEffect(() => {
    const newMenu = profileMenu.map((el) => {
      if (el.name == "Dashboard") {
        return {
          ...el,
          href: `/${user.role}${ROUTES.DASHBOARD}`,
        };
      } else return el;
    });
    setMenu(newMenu);
  }, [profileMenu, user]);
  return (
    <div className="flex items-center gap-8">
      {(!user || user.role === ROLE.poster) && (
        <FormButton size="lg" href={ROUTES.POST_TASK}>
          Post a Task
        </FormButton>
      )}

      <div className="flex gap-5 items-center">
        <MdOutlineMessage className="text-2xl cursor-pointer" />

        <div className="relative cursor-pointer">
          <span className="w-[14px] h-[14px] rounded-full bg-red-state-color absolute -top-[6px] right-0"></span>
          <IoNotificationsOutline className="text-2xl" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 focus-visible:outline-none">
              <Image
                width={60}
                height={60}
                src={user.profile_image || defaultProfile}
                alt="user_profile"
                className="w-[1.875rem] h-[1.875rem] rounded-full object-cover"
              />
              <span className="text-[17px] text-dark-secondary font-medium">
                {loggedInUser(user.first_name, user.last_name)}
              </span>
              <Icons.dropdown
                width={20}
                height={20}
                className="transition-transform"
              />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-[280px] space-y-2 py-5 px-7 mt-5 rounded-[20px] z-[99]"
          >
            <div className="flex gap-2 mb-4">
              <Image
                src={user?.profile_image || defaultProfile}
                alt="profile"
                width={50}
                height={50}
                className="w-[50px] h-[50px] rounded-full object-cover object-top"
              />

              <div className="space-y-1">
                <p className="text-base text-black-2">
                  {loggedInUser(user.first_name, user.last_name)}
                </p>
                <p className="text-dark-grey-2 text-sm">{user.email}</p>
              </div>
            </div>

            <FormButton size="lg" className="w-full mb-3 rounded-full">
              Switch to {user.role === ROLE.tasker ? "Poster" : "Tasker"}
            </FormButton>

            {menu.map((el, i) =>
              el.name !== "Logout" ? (
                <DropdownMenuItem
                  key={i}
                  asChild
                  className="focus:bg-transparent"
                >
                  <Link
                    href={el.href}
                    className="flex items-center gap-4 cursor-pointer"
                  >
                    <el.icon />
                    <span className="text-base text-dark-secondary">
                      {el.name}
                    </span>
                  </Link>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  key={i}
                  onClick={onLogout}
                  className="!text-[#EC514B] flex items-center gap-2 cursor-pointer focus:bg-transparent"
                >
                  <Icons.logout />
                  <span className="text-base">{el.name}</span>
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default UserActions;
