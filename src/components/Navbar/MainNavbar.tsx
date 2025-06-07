"use client";

import React, { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { logoutUser } from "@/actions/authActions";
import { logout } from "@/store/slices/user";

import DesktopNav from "./DesktopNav";
import UserActions from "./UserActions";
import GuestActions from "./GuestActions";
import MobileToggle from "./MobileToggle";

interface IProp {
  isAuth: boolean;
}

const MainNavbar = ({ isAuth }: IProp) => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [active, setActive] = useState("");
  const path = usePathname();
  const params = useParams();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHashChange = () => {
        setActive(window.location.hash || path);
      };
      window.addEventListener("hashchange", handleHashChange);
      handleHashChange();
      return () => window.removeEventListener("hashchange", handleHashChange);
    }
  }, [params, path]);

  const handleLogout = () => {
    dispatch(logout());
    logoutUser();
  };

  return (
    <div className="fixed w-[95%] left-1/2 -translate-x-1/2 top-5 z-[100]">
      <div className="shadow-sm max-w-[87.5rem] mx-auto h-[4.688rem] flex items-center rounded-[3.125rem] px-5 w-full bg-white overflow-visible">
        <div className="w-full flex justify-between items-center">
          <Link href="/">
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
            <div className="md:flex items-center gap-5 hidden ">
              {isAuth ? (
                <UserActions user={user} onLogout={handleLogout} />
              ) : (
                <GuestActions user={user} />
              )}
            </div>

            <MobileToggle onClick={() => setShowMobileNav((prev) => !prev)} />
          </div>
        </div>
      </div>
      {}
    </div>
  );
};

export default MainNavbar;
