import React from "react";
import {
  MessageCircle,
  User,
  LayoutDashboard,
  Settings,
  LogOut,
  ClipboardList,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { defaultProfile } from "@/constant/images";
import { loggedInUser } from "@/utils";
import { ROUTES } from "@/constant";
import { NavLink } from "./NavLink";
import { ActionButton } from "./ActionButton";
import SwitchRoleBtn from "../../../SwitchRoleBtn";
import NotificationBell from "../../../Notifications/NotificationBell";

interface UserProfileProps {
  user: Partial<IUser>;
  notifications: number;
  onLogout: () => void;
  onNavClick: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  onLogout,
  onNavClick,
}) => {
  const userInitials = `${user.first_name?.[0] || ""}${
    user.last_name?.[0] || ""
  }`.toUpperCase();

  return (
    <div className="border-t border-neutral-200 bg-neutral-50/50">
      {/* User Header */}
      <div className="p-4">
        <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-neutral-200 shadow-sm">
          <Avatar className="h-12 w-12 ring-2 ring-primary-200">
            <AvatarImage
              src={
                typeof user.profile_image === "string"
                  ? user.profile_image
                  : defaultProfile.src
              }
              alt="Profile"
            />
            <AvatarFallback className="bg-primary text-white text-sm font-semibold">
              {userInitials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-neutral-900 leading-tight">
              {loggedInUser(user.first_name, user.last_name)}
            </h3>
            <p className="text-neutral-600 text-sm capitalize">{user.role}</p>
          </div>

          <div className="flex items-center gap-1">
            <NotificationBell />
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 rounded-full hover:bg-neutral-100"
            >
              <MessageCircle className="w-4 h-4 text-neutral-600" />
            </Button>
          </div>
        </div>
      </div>

      {/* Role Switch */}
      <div className="px-4 mb-4">
        <SwitchRoleBtn
          user={user}
          className="w-full btn-secondary h-11 text-sm font-medium"
        />
      </div>

      {/* Navigation Menu */}
      <div className="px-4 space-y-1 mb-4">
        {user.role && (
          <NavLink
            href={`/${user.role}${ROUTES.MY_TASKS}`}
            onClick={onNavClick}
          >
            <ClipboardList className="w-5 h-5" />
            <span>My Tasks</span>
          </NavLink>
        )}

        <NavLink href={`/${user.role}${ROUTES.DASHBOARD}`} onClick={onNavClick}>
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          href={`/${user.role}${ROUTES.DASHBOARD}/profile`}
          onClick={onNavClick}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </NavLink>

        <NavLink
          href={`/${user.role}${ROUTES.DASHBOARD}/account`}
          onClick={onNavClick}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>

        <ActionButton onClick={onLogout} variant="danger">
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </ActionButton>
      </div>
    </div>
  );
};
