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
import { ROUTES } from "@/constant";
import { Menu } from "lucide-react";
import useToggle from "@/hooks/useToggle";
import MobileSidebar from "../dashboard/sidebar/MobileSidebar";

interface Props {
  isAuth: boolean;
}

const MainNavbar = ({ isAuth }: Props) => {
  // const [showMobileNav, setShowMobileNav] = useState(false);
  const path = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const showSideBar = useToggle();
  const showMobileNav = useToggle();

  const handleLogout = () => {
    dispatch(logout());
    logoutUser();
  };

  const homRoute = isAuth ? `${ROUTES.DISCOVERY}/${user.role}` : ROUTES.HOME;

  return (
    <div>
      <div className="fixed w-[95%] left-1/2 -translate-x-1/2 top-5 z-40">
        <div className="shadow-sm max-w-[87.5rem] mx-auto h-[60px] md:h-[4.688rem] flex items-center rounded-[3.125rem] px-5 w-full bg-white overflow-visible">
          <div className="w-full flex justify-between items-center">
            {isAuth && (
              <Menu className="sm:hidden" onClick={showSideBar.handleOpen} />
            )}
            <Link href={homRoute} aria-label="Homepage">
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
                open={showMobileNav.isOpen}
                onClick={showMobileNav.handleOpen}
              />
            </div>
          </div>
        </div>
      </div>
      <MobileSidebar
        isOpen={showSideBar.isOpen}
        onOpenChange={showSideBar.setIsOpen}
        user={user}
        handleClose={showSideBar.handleClose}
      />
      <MobileNavbar
        showMobileNav={showMobileNav.isOpen}
        toggleMobileNav={showMobileNav.setIsOpen}
      />
    </div>
  );
};

export default MainNavbar;
