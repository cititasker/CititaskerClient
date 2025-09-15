"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Grid,
  Search,
  Plus,
  User,
  Bell,
  MessageCircle,
  Settings,
  LogOut,
  LayoutDashboard,
  Workflow,
  ClipboardCheck,
  ClipboardList,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import CustomSheet from "../../../reusables/CustomSheet";
import FormButton from "../../../forms/FormButton";
import { ROLE, ROUTES } from "@/constant";
import { defaultProfile } from "@/constant/images";
import { loggedInUser } from "@/utils";
import { useNavbarData } from "../hooks/useNavbarData";
import { useQueryClient } from "@tanstack/react-query";
import { howItWorksItems } from "../constant";

interface MobileNavbarProps {
  showMobileNav: boolean;
  toggleMobileNav: () => void;
  isAuth: boolean;
  user: IUser | undefined;
  onLogout: () => void;
}

// Category Search Component
const CategorySearch = ({
  categoryGroups,
  toggleMobileNav,
  isLoading,
}: {
  categoryGroups: any[];
  toggleMobileNav: () => void;
  isLoading: boolean;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGroups = React.useMemo(() => {
    if (!searchTerm.trim()) return categoryGroups;

    return categoryGroups.filter((group) => {
      const categoryMatch = group.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const hasMatchingChild = group.children.some((child: any) =>
        child.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return categoryMatch || hasMatchingChild;
    });
  }, [categoryGroups, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-text-muted">Loading categories...</div>
      </div>
    );
  }

  return (
    <AccordionItem value="categories" className="border-none">
      <AccordionTrigger className="text-text-primary hover:text-primary-600 text-base font-medium py-4 px-4 rounded-none hover:bg-primary-50 transition-all duration-200 hover:no-underline [&[data-state=open]]:bg-primary-50 [&[data-state=open]]:text-primary-700">
        <div className="flex items-center gap-3">
          <Grid className="w-5 h-5" />
          <span>Categories</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-2 pt-2">
        <div className="px-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-border-light focus:border-primary-400 bg-background-secondary"
            />
          </div>

          {/* Categories */}
          {filteredGroups.length === 0 ? (
            <div className="text-center py-8">
              <Grid className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-text-muted">No categories found</p>
            </div>
          ) : (
            <Accordion type="multiple" className="space-y-2">
              {filteredGroups.map((group, idx) => (
                <AccordionItem
                  key={idx}
                  value={`category-${idx}`}
                  className="border-none"
                >
                  <AccordionTrigger className="text-primary-700 hover:text-primary-800 text-sm font-semibold py-2 px-3 rounded-md hover:bg-primary-50 transition-all duration-200 hover:no-underline [&[data-state=open]]:bg-primary-50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full" />
                      <span>{group.category}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2 pt-1">
                    <div className="pl-4 space-y-1">
                      {group.children.map((item: any, i: number) => (
                        <Link
                          key={i}
                          href={item.href}
                          onClick={toggleMobileNav}
                          className="block px-3 py-2 text-sm text-text-secondary hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

// How It Works Component
const HowItWorksSection = ({
  toggleMobileNav,
}: {
  toggleMobileNav: () => void;
}) => {
  return (
    <AccordionItem value="how-it-works" className="border-none">
      <AccordionTrigger className="text-text-primary hover:text-primary-600 text-base font-medium py-4 px-4 rounded-none hover:bg-primary-50 transition-all duration-200 hover:no-underline [&[data-state=open]]:bg-primary-50 [&[data-state=open]]:text-primary-700">
        <div className="flex items-center gap-3">
          <ClipboardCheck className="w-5 h-5" />
          <span>How It Works</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-2 pt-2">
        <div className="px-4 space-y-3">
          {howItWorksItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              onClick={toggleMobileNav}
              className="flex !items-start gap-3 p-3 rounded-none rounded-b-lg hover:bg-background-secondary transition-colors"
            >
              <div className={`p-2 rounded-lg ${item.color}`}>
                <item.icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-text-primary text-sm mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-text-muted">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

// User Profile Section (for authenticated users)
const UserProfileSection = ({
  user,
  onLogout,
  toggleMobileNav,
}: {
  user: Partial<IUser>;
  onLogout: () => void;
  toggleMobileNav: () => void;
}) => {
  const [notifications] = React.useState(2);
  const queryClient = useQueryClient();

  const userInitials = `${user.first_name?.[0] || ""}${
    user.last_name?.[0] || ""
  }`.toUpperCase();

  const handleLogout = async () => {
    await onLogout();
    queryClient.clear();
    toggleMobileNav();
  };

  return (
    <div className="border-t border-border-light pt-6">
      {/* User Info */}
      <div className="px-4 mb-4">
        <div className="flex items-center gap-3 p-3 bg-background-secondary rounded-lg">
          <Avatar className="h-12 w-12 ring-2 ring-primary-200">
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
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary text-base leading-tight line-clamp-1">
              {loggedInUser(user.first_name, user.last_name)}
            </h3>
            <p className="text-text-muted text-sm line-clamp-1 capitalize">
              {user.role}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="relative p-2 h-8 w-8 rounded-full"
            >
              <Bell className="w-4 h-4 text-text-muted" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-error text-[10px] text-white">
                  {notifications}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 h-8 w-8 rounded-full"
            >
              <MessageCircle className="w-4 h-4 text-text-muted" />
            </Button>
          </div>
        </div>
      </div>

      {/* Role Switch */}
      <div className="px-4 mb-4">
        <FormButton className="w-full btn-secondary text-sm">
          Switch to {user.role === ROLE.tasker ? "Poster" : "Tasker"}
        </FormButton>
      </div>

      {/* My Tasks (for authenticated users) */}
      {user.role && (
        <div className="px-4">
          <Link
            href={`/${user.role}${ROUTES.MY_TASKS}`}
            onClick={toggleMobileNav}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-background-secondary transition-colors"
          >
            <ClipboardList className="w-4 h-4 text-text-muted" />
            <span className="text-text-secondary">My Tasks</span>
          </Link>
        </div>
      )}

      {/* User Menu Items */}
      <div className="px-4 space-y-1">
        <Link
          href={`/${user.role}${ROUTES.DASHBOARD}`}
          onClick={toggleMobileNav}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-background-secondary transition-colors"
        >
          <LayoutDashboard className="w-4 h-4 text-text-muted" />
          <span className="text-text-secondary">Dashboard</span>
        </Link>

        <Link
          href="/profile"
          onClick={toggleMobileNav}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-background-secondary transition-colors"
        >
          <User className="w-4 h-4 text-text-muted" />
          <span className="text-text-secondary">Profile</span>
        </Link>

        <Link
          href="/settings"
          onClick={toggleMobileNav}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-background-secondary transition-colors"
        >
          <Settings className="w-4 h-4 text-text-muted" />
          <span className="text-text-secondary">Settings</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 rounded-lg text-error hover:bg-error-light transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

// Role-based Action Buttons
const ActionButtons = ({
  user,
  isAuth,
  toggleMobileNav,
}: {
  user: IUser | undefined;
  isAuth: boolean;
  toggleMobileNav: () => void;
}) => {
  return (
    <div className="p-4 space-y-2 border-t border-border-light ">
      {!isAuth && (
        <>
          <FormButton
            href={ROUTES.CREATE_ACCOUNT}
            onClick={toggleMobileNav}
            variant="outline"
            className="w-full border-primary-200 text-primary-600 hover:bg-primary-50"
          >
            <User className="w-4 h-4 mr-2" />
            Sign Up
          </FormButton>

          <FormButton
            href={ROUTES.LOGIN}
            onClick={toggleMobileNav}
            variant="outline"
            className="w-full border-primary-200 text-primary-600 hover:bg-primary-50"
          >
            <User className="w-4 h-4 mr-2" />
            Login
          </FormButton>
        </>
      )}

      {(!isAuth || user?.role === ROLE.tasker) && (
        <FormButton
          href={ROUTES.BROWSE_TASK}
          onClick={toggleMobileNav}
          variant="outline"
          className="w-full border-primary-200 text-primary-600 hover:bg-primary-50"
        >
          <Search className="w-4 h-4 mr-2" />
          Browse Tasks
        </FormButton>
      )}
      {(!isAuth || user?.role === ROLE.poster) && (
        <FormButton
          href={ROUTES.POST_TASK}
          onClick={toggleMobileNav}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Post Task
        </FormButton>
      )}
    </div>
  );
};

// Main MobileNavbar Component
export default function MobileNavbar({
  showMobileNav,
  toggleMobileNav,
  isAuth,
  user,
  onLogout,
}: MobileNavbarProps) {
  const { categoryGroups, isLoading } = useNavbarData();

  return (
    <CustomSheet
      open={showMobileNav}
      onOpenChange={toggleMobileNav}
      side="right"
      showCloseIcon={false}
      className="bg-background px-0 py-0"
    >
      <div className="flex flex-col h-full">
        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="max-w-[500px] w-full mx-auto">
            {/* Main Navigation */}
            <nav>
              <Accordion type="multiple" className="space-y-2">
                {/* Categories */}
                <CategorySearch
                  categoryGroups={categoryGroups}
                  toggleMobileNav={toggleMobileNav}
                  isLoading={isLoading}
                />

                {/* How It Works */}
                <HowItWorksSection toggleMobileNav={toggleMobileNav} />
              </Accordion>
            </nav>

            {/* User Profile Section (only for authenticated users) */}
            {isAuth && user && (
              <UserProfileSection
                user={user}
                onLogout={onLogout}
                toggleMobileNav={toggleMobileNav}
              />
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <ActionButtons
          user={user}
          isAuth={isAuth}
          toggleMobileNav={toggleMobileNav}
        />
      </div>
    </CustomSheet>
  );
}
