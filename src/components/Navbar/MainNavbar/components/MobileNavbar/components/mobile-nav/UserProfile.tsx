import React from "react";
import {
  Bell,
  MessageCircle,
  User,
  LayoutDashboard,
  Settings,
  LogOut,
  ClipboardList,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { defaultProfile } from "@/constant/images";
import { loggedInUser } from "@/utils";
import { ROLE, ROUTES } from "@/constant";
import FormButton from "@/components/forms/FormButton";
import { NavLink } from "./NavLink";
import { ActionButton } from "./ActionButton";

interface UserProfileProps {
  user: Partial<IUser>;
  notifications: number;
  onLogout: () => void;
  onNavClick: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  notifications,
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
            <Button
              variant="ghost"
              size="sm"
              className="relative h-9 w-9 rounded-full hover:bg-neutral-100"
            >
              <Bell className="w-4 h-4 text-neutral-600" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-error text-[10px] text-white border-2 border-white">
                  {notifications > 9 ? "9+" : notifications}
                </Badge>
              )}
            </Button>
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
        <FormButton className="w-full btn-secondary h-11 text-sm font-medium">
          Switch to {user.role === ROLE.tasker ? "Poster" : "Tasker"}
        </FormButton>
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

        <NavLink href="/profile" onClick={onNavClick}>
          <User className="w-5 h-5" />
          <span>Profile</span>
        </NavLink>

        <NavLink href="/settings" onClick={onNavClick}>
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
