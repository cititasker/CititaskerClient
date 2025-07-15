"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { IArrowDown } from "@/constant/icons";

interface MenuItem {
  name: string;
  href?: string;
  icon: any;
  children?: MenuItem[];
}

interface SidebarMenuItemProps {
  item: MenuItem;
  level?: number;
  openMenus: Record<string, boolean>;
  toggleMenu: (key: string) => void;
  role: string;
  className?: string;
}

const SidebarMenuItem = ({
  item,
  level = 0,
  openMenus,
  toggleMenu,
  role,
}: SidebarMenuItemProps) => {
  const pathname = usePathname();
  const key = `${role}-${item.href || item.name}`;
  const isOpen = openMenus[key];
  const fullPath = `/${role}${item.href ?? ""}`;
  const isActive = pathname === fullPath;

  const hasChildren = Boolean(item.children?.length);
  const padding = level === 0 ? "pl-[50px] pr-5" : "px-[70px]";

  const baseStyles = cn(
    "flex items-center cursor-pointer gap-3 h-[56px] w-full rounded-none border-r-2 text-base font-normal transition-colors",
    padding,
    isActive
      ? "bg-light-primary-1 border-primary text-primary"
      : "border-transparent text-balck-2 hover:bg-current/40"
  );

  const Icon = item.icon;

  if (hasChildren) {
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={() => toggleMenu(key)}
        className="w-full"
      >
        <CollapsibleTrigger asChild>
          <button
            className={baseStyles}
            aria-expanded={isOpen}
            aria-controls={`${key}-children`}
          >
            <div className="flex flex-1 items-center gap-3">
              <Icon />
              <span>{item.name}</span>
            </div>
            <IArrowDown
              className={cn(
                "transform transition-transform",
                !isOpen ? "-rotate-180" : "rotate-0"
              )}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent id={`${key}-children`} className="">
          {item.children?.map((child, idx) => (
            <SidebarMenuItem
              key={`${key}-child-${idx}`}
              item={child}
              level={level + 1}
              openMenus={openMenus}
              toggleMenu={toggleMenu}
              role={role}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Link href={`/${role}${item.href ?? "#"}`} className={baseStyles}>
      <Icon />
      <span>{item.name}</span>
    </Link>
  );
};

export default SidebarMenuItem;
