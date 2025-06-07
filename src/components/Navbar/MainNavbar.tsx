"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { logoutUser } from "@/actions/authActions";
import { logout } from "@/store/slices/user";

import DesktopNav from "./DesktopNav";
import UserActions from "./UserActions";
import GuestActions from "./GuestActions";
import MobileToggle from "./MobileToggle";
import MobileNavbar from "./MobileNavbar";

interface Props {
  isAuth: boolean;
}

const MainNavbar = ({ isAuth }: Props) => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const path = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    logoutUser();
  };

  return (
    <div>
      <div className="fixed w-[95%] left-1/2 -translate-x-1/2 top-5 z-[100]">
        <div className="shadow-sm max-w-[87.5rem] mx-auto h-[60px] md:h-[4.688rem] flex items-center rounded-[3.125rem] px-5 w-full bg-white overflow-visible">
          <div className="w-full flex justify-between items-center">
            <Link href="/" aria-label="Homepage">
              <Image
                src="/icons/logo_icon.svg"
                alt="brand_logo"
                width={200}
                height={70}
                className="h-5 w-auto sm:h-auto"
              />
            </Link>

            <DesktopNav isAuth={isAuth} path={path} user={user} />

            <div className="flex items-center gap-5">
              <div className="hidden md:flex items-center gap-5">
                {isAuth ? (
                  <UserActions user={user} onLogout={handleLogout} />
                ) : (
                  <GuestActions user={user} />
                )}
              </div>

              <MobileToggle
                open={showMobileNav}
                onClick={() => setShowMobileNav((v) => !v)}
              />
            </div>
          </div>
        </div>
      </div>
      <MobileNavbar
        showMobileNav={showMobileNav}
        toggleMobileNav={() => setShowMobileNav(false)}
      />
    </div>
  );
};

export default MainNavbar;
