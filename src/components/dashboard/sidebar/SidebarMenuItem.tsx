"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MenuItem } from "./data/menuConfig";

interface SidebarMenuItemProps {
  item: MenuItem;
  role: string;
  level?: number;
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
  onNavigate?: () => void;
}

const SidebarMenuItem = ({
  item,
  role,
  level = 0,
  isExpanded = false,
  onToggleExpanded,
  onNavigate,
}: SidebarMenuItemProps) => {
  const pathname = usePathname();
  const fullPath = item.href ? `/${role}${item.href}` : null;
  const isActive = fullPath && pathname === fullPath;
  const hasChildren = Boolean(item.children?.length);

  const baseClasses = cn(
    "w-full justify-start transition-all duration-200 group relative",
    level === 0 ? "h-12 px-3" : "h-10 px-6 text-sm",
    isActive && "bg-primary text-primary-foreground shadow-sm",
    !isActive && "hover:bg-accent hover:text-accent-foreground"
  );

  const Icon = item.icon;

  // Parent with children
  if (hasChildren) {
    return (
      <div className="space-y-1">
        <Button
          variant="ghost"
          className={baseClasses}
          onClick={onToggleExpanded}
        >
          <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
          <span className="flex-1 text-left font-medium">{item.name}</span>
          {item.badge && (
            <Badge variant="secondary" className="mr-2 h-5 px-1.5 text-xs">
              {item.badge}
            </Badge>
          )}
          <ChevronRight
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isExpanded && "rotate-90"
            )}
          />
        </Button>

        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="space-y-1">
            {item.children?.map((child) => (
              <SidebarMenuItem
                key={child.name}
                item={child}
                role={role}
                level={level + 1}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Single item
  const MenuButton = (
    <Button variant="ghost" className={baseClasses}>
      <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
      <span className="flex-1 text-left font-medium">{item.name}</span>
      {item.badge && (
        <Badge variant="secondary" className="h-5 px-1.5 text-xs">
          {item.badge}
        </Badge>
      )}
    </Button>
  );

  return fullPath ? (
    <Link href={fullPath} onClick={onNavigate}>
      {MenuButton}
    </Link>
  ) : (
    <div className="opacity-50 cursor-not-allowed">{MenuButton}</div>
  );
};

export default SidebarMenuItem;
