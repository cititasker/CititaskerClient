"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { logoutUser } from "@/actions/authActions";
import { logout } from "@/store/slices/user";
import { ROUTES } from "@/constant";
import useToggle from "@/hooks/useToggle";
import { useNavbarData } from "./hooks/useNavbarData";
import { CategoryDropdown } from "./components/CategoryDropdown";
import { HowItWorksDropdown } from "./components/HowItWorksDropdown";
import { RoleBasedActions } from "./components/RoleBasedActions";
import { UserActions } from "./components/UserActions";
import { GuestActions } from "./components/GuestActions";
import MobileToggle from "../MobileToggle";
import MobileNavbar from "./components/MobileNavbar";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/dashboard/sidebar/hooks/useSidebar";
import { usePathname } from "next/navigation";

interface MainNavbarProps {
  isAuth: boolean;
}

export default function MainNavbar({ isAuth }: MainNavbarProps) {
  const { openSidebar } = useSidebar();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const showMobileNav = useToggle();
  const path = usePathname();

  const isDashboard = path.includes("dashboard");

  const { categoryGroups, isLoading } = useNavbarData();

  const handleLogout = () => {
    dispatch(logout());
    logoutUser();
  };

  const homeRoute = isAuth ? `${ROUTES.DISCOVERY}/${user.role}` : ROUTES.HOME;

  return (
    <>
      {/* Fixed Navbar */}
      <div className="fixed w-[95%] left-1/2 -translate-x-1/2 top-5 z-40">
        <div className="bg-white/95 backdrop-blur-md border border-gray-200 shadow-lg mx-auto h-16 flex items-center rounded-2xl px-6 w-full">
          <div className="w-full flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-6">
              {/* Mobile Menu & Logo */}
              <div className="flex items-center gap-4">
                {isAuth && isDashboard && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="lg:hidden bg-background border-border"
                    onClick={() => {
                      console.log("Click: open sidebar");
                      openSidebar();
                    }}
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                )}

                <Link
                  href={homeRoute}
                  aria-label="Homepage"
                  className="flex-shrink-0"
                >
                  <Image
                    src="/icons/logo_icon.svg"
                    alt="Brand Logo"
                    width={120}
                    height={32}
                    className="h-8 w-auto"
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden xl:flex items-center gap-2">
                <CategoryDropdown
                  categoryGroups={categoryGroups}
                  isLoading={isLoading}
                />
                <HowItWorksDropdown userRole={user?.role} />

                {isAuth && user?.role && (
                  <Link
                    href={`/${user.role}${ROUTES.MY_TASKS}`}
                    className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    My Tasks
                  </Link>
                )}
              </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Desktop Role-based Actions - Hidden on Mobile */}
              <div className="hidden md:flex">
                <RoleBasedActions user={user} isAuth={isAuth} />
              </div>

              {/* User Actions */}
              <div className="hidden md:flex">
                {isAuth ? (
                  <UserActions user={user} onLogout={handleLogout} />
                ) : (
                  <GuestActions user={user} />
                )}
              </div>

              {/* Mobile Toggle */}
              <MobileToggle
                open={showMobileNav.isOpen}
                onClick={showMobileNav.handleOpen}
              />
            </div>
          </div>
        </div>
      </div>

      <MobileNavbar
        showMobileNav={showMobileNav.isOpen}
        toggleMobileNav={showMobileNav.toggle}
        isAuth={isAuth}
        user={user}
        onLogout={handleLogout}
      />
    </>
  );
}
