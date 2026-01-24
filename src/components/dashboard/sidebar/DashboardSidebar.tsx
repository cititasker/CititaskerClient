"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import UserProfile from "./UserProfile";
import { useSidebar } from "./hooks/useSidebar";
import { MENU_ITEMS } from "./data/menuConfig";
import SidebarMenuItem from "./SidebarMenuItem";

interface DashboardSidebarProps {
  role: string;
}

const DashboardSidebar = ({ role }: DashboardSidebarProps) => {
  const { isOpen, closeSidebar, toggleExpanded, isExpanded } = useSidebar();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#000]/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 lg:w-72 lg:relative lg:z-0",
          "transform transition-transform duration-300 ease-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Card className="h-fit rounded-none lg:rounded-xl border-r lg:border-none shadow-xl lg:shadow-sm">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b lg:hidden">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  D
                </span>
              </div>
              <span className="font-semibold">Dashboard</span>
            </div>
            <Button variant="ghost" size="icon" onClick={closeSidebar}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* User Profile */}
          <UserProfile />

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
            {MENU_ITEMS.map((item) => (
              <SidebarMenuItem
                key={item.name}
                item={item}
                role={role}
                isExpanded={isExpanded(item.name)}
                onToggleExpanded={() => toggleExpanded(item.name)}
                onNavigate={closeSidebar}
              />
            ))}
          </nav>
        </Card>
      </aside>
    </>
  );
};

export default DashboardSidebar;
