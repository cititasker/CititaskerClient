"use client";
import React from "react";
import Link from "next/link";
import {
  MessageCircle,
  Settings,
  LogOut,
  User,
  LayoutDashboard,
} from "@/components/icons/index";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { defaultProfile } from "@/constant/images";
import { ROUTES } from "@/constant";
import { loggedInUser } from "@/utils";
import SwitchRoleBtn from "./SwitchRoleBtn";
import NotificationBell from "./Notifications/NotificationBell";

interface UserActionsProps {
  user: Partial<IUser>;
  onLogout: () => void;
}

export function UserActions({ user, onLogout }: UserActionsProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const userInitials = `${user.first_name?.[0] || ""}${
    user.last_name?.[0] || ""
  }`.toUpperCase();

  const menuSections = [
    {
      items: [
        {
          icon: LayoutDashboard,
          label: "Dashboard",
          href: `/${user.role}${ROUTES.DASHBOARD}`,
          description: "Overview and analytics",
        },
        {
          icon: User,
          label: "Profile",
          href: `/${user.role}${ROUTES.PROFILE}`,
          description: "Manage your account",
        },
        {
          icon: Settings,
          label: "Settings",
          href: `/${user.role}${ROUTES.ACCOUNT}`,
          description: "Preferences and privacy",
        },
      ],
    },
  ];

  return (
    <div className="flex items-center gap-3">
      {/* Notifications */}
      <NotificationBell />

      {/* Messages */}
      <Button
        variant="ghost"
        size="sm"
        className="p-2 h-10 w-10 rounded-full hover:bg-gray-100"
      >
        <MessageCircle className="w-5 h-5 text-gray-600" />
      </Button>

      {/* User Menu */}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-3 h-10 px-3 hover:bg-gray-100 rounded-full"
          >
            <Avatar className="h-8 w-8 ring-2 ring-gray-100">
              <AvatarImage
                src={
                  typeof user.profile_image === "string"
                    ? user.profile_image
                    : defaultProfile.src
                }
                alt="Profile"
              />
              <AvatarFallback className="bg-primary text-white text-sm">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-medium text-gray-900 leading-none">
                {loggedInUser(user.first_name, user.last_name)}
              </span>
              <span className="text-xs text-gray-500 leading-none mt-1 capitalize">
                {user.role}
              </span>
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-72 p-0 rounded-2xl shadow-2xl border-0 bg-white overflow-hidden"
          align="end"
          sideOffset={12}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 pb-0">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 ring-4 ring-white shadow-lg">
                <AvatarImage
                  src={
                    typeof user.profile_image === "string"
                      ? user.profile_image
                      : defaultProfile.src
                  }
                  alt="Profile"
                />
                <AvatarFallback className="bg-primary text-white text-lg">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-1">
                  {loggedInUser(user.first_name, user.last_name)}
                </h3>
                <h3 className="text-gray-600 text-sm line-clamp-1 break-words">
                  {user?.email}
                </h3>
              </div>
            </div>
          </div>

          {/* Role Switch */}
          <div className="p-4 border-b border-gray-100">
            <SwitchRoleBtn user={user} />
          </div>

          {/* Menu Items */}
          <div>
            {menuSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {section.items.map((item, i) => (
                  <DropdownMenuItem key={i} asChild className="p-0">
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-primary/10 transition-colors">
                        <item.icon className="w-4 h-4 text-gray-600 group-hover:text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
                {sectionIndex < menuSections.length - 1 && (
                  <DropdownMenuSeparator className="my-2" />
                )}
              </div>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-gray-100">
            <DropdownMenuItem asChild className="p-0">
              <button
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="flex items-center gap-4 w-full p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors group"
              >
                <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                  <LogOut className="w-4 h-4" />
                </div>
                <p className="flex-1 text-left font-medium text-sm">Sign Out</p>
              </button>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
