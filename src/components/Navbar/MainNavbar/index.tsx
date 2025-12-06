"use client";
import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useAppDispatch } from "@/store/hook";
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
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/dashboard/sidebar/hooks/useSidebar";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import BrandLogo from "@/components/reusables/BrandLogo";
import { cn } from "@/lib/utils";

export default function MainNavbar() {
  const { openSidebar } = useSidebar();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAuth();

  const showMobileNav = useToggle();
  const path = usePathname();

  const isDashboard = path.includes("dashboard");

  const { categoryGroups, isLoading } = useNavbarData();

  const isActive = (href: string) => {
    return path === href || path.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      dispatch(logout());
      await logoutUser();
      window.location.href = ROUTES.LOGIN;
    } catch {
      window.location.href = ROUTES.LOGIN;
    }
  };

  const homeRoute = isAuthenticated
    ? `${ROUTES.DISCOVERY}-${user?.role}`
    : ROUTES.HOME;

  return (
    <>
      {/* Fixed Navbar */}
      <div className="fixed w-[95%] left-1/2 -translate-x-1/2 top-5 z-40">
        <div className="bg-white/95 backdrop-blur-md border border-gray-200 shadow-sm md:shadow-md mx-auto h-16 flex items-center rounded-2xl px-6 w-full">
          <div className="w-full flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-6">
              {/* Mobile Menu & Logo */}
              <div className="flex items-center gap-4">
                {isAuthenticated && isDashboard && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="lg:hidden bg-background border-border"
                    onClick={openSidebar}
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                )}

                <BrandLogo href={homeRoute} className="flex-shrink-0" />
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden xl:flex items-center gap-2">
                <CategoryDropdown
                  categoryGroups={categoryGroups}
                  isLoading={isLoading}
                />
                <HowItWorksDropdown />

                {isAuthenticated && user?.role && (
                  <Button
                    asChild
                    variant="ghost"
                    className={cn(
                      "flex items-center gap-2 hover:bg-primary/10 hover:text-primary",
                      isActive(`/${user.role}${ROUTES.MY_TASKS}`) &&
                        "text-primary bg-primary/10"
                    )}
                  >
                    <Link href={`/${user.role}${ROUTES.MY_TASKS}`}>
                      My Tasks
                    </Link>
                  </Button>
                )}
              </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex">
                <RoleBasedActions user={user} isAuth={isAuthenticated} />
              </div>

              {/* User Actions */}
              <div className="hidden md:flex">
                {isAuthenticated && user ? (
                  <UserActions user={user} onLogout={handleLogout} />
                ) : (
                  <GuestActions />
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
        isAuth={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />
    </>
  );
}
