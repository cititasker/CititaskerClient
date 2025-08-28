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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const padding =
    level === 0
      ? "px-5 md:pl-[30px] lg:pl-[50px] md:pr-5"
      : "px-5 md:px-[70px]";

  const baseStyles = cn(
    "flex items-center justify-center md:justify-start cursor-pointer gap-3 h-12 md:h-[56px] w-full rounded-none border-r-2 text-base font-normal transition-colors",
    padding,
    isActive
      ? "bg-light-primary-1 border-primary text-primary"
      : "border-transparent text-balck-2 hover:bg-current/40"
  );

  const Icon = item.icon;

  if (hasChildren) {
    return (
      <>
        <Collapsible
          open={isOpen}
          onOpenChange={() => toggleMenu(key)}
          className="w-full hidden md:block"
        >
          <CollapsibleTrigger asChild>
            <button
              className={baseStyles}
              aria-expanded={isOpen}
              aria-controls={`${key}-children`}
            >
              <div className="flex flex-1 items-center gap-3">
                <Icon />
                <span className="hidden md:inline-block">{item.name}</span>
              </div>
              <IArrowDown
                className={cn(
                  "transform transition-transform hidden md:inline-block",
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <button
              className={baseStyles}
              aria-expanded={isOpen}
              aria-controls={`${key}-children`}
            >
              <div className="flex flex-1 items-center gap-3">
                <Icon />
                <span className="hidden md:inline-block">{item.name}</span>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="center"
            side="right"
            sideOffset={10}
            className="w-48"
          >
            <div className="px-4 py-2">
              <p className="text-xs font-medium text-nav-icon">{item.name}</p>
            </div>
            {item.children?.map((child, idx) => (
              <Link
                key={`${key}-child-${idx}`}
                href={`/${role}${child.href ?? "#"}`}
                className={`flex items-center gap-2 px-4 py-2 h-fit w-full `}
              >
                {/* <Icon /> */}
                <span className="text-sm">{child.name}</span>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }

  return (
    <Link href={`/${role}${item.href ?? "#"}`} className={baseStyles}>
      <Icon />
      <span className="hidden md:inline-block">{item.name}</span>
    </Link>
  );
};

export default SidebarMenuItem;
