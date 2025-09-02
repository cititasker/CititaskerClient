"use client";

import React from "react";
import { menuData } from "data";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import CustomSheet from "@/components/reusables/CustomSheet";
import UserProfile from "./UserProfile";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: Partial<IUser>;
  handleClose: () => void;
}

const MobileSidebar = ({ isOpen, onOpenChange, user, handleClose }: Props) => {
  const pathname = usePathname();

  return (
    <CustomSheet
      open={isOpen}
      onOpenChange={onOpenChange}
      title=""
      side="left"
      className="p-0"
    >
      <div className="mt-6">
        <UserProfile className="!flex" />
        <div>
          {menuData.map((item, index) => {
            if (item.children) {
              return (
                <Collapsible key={index} className="px-5">
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center gap-3 h-12 w-full">
                      <item.icon />
                      {item.name}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4">
                    {item.children.map((el, idx) => (
                      <Link
                        key={idx}
                        href={`/${user.role}${el.href}`}
                        className="flex items-center gap-3 h-12 w-full"
                        onClick={handleClose}
                      >
                        <el.icon />
                        {el.name}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              );
            } else {
              return (
                <Link
                  key={index}
                  href={`/${user.role}${item.href ?? "#"}`}
                  className={cn(
                    "flex items-center justify-start cursor-pointer gap-3 h-12 w-full rounded-none text-base font-normal transition-colors px-5",
                    pathname == `/${user.role}${item.href ?? ""}`
                      ? "bg-light-primary-1 text-primary"
                      : "text-balck-2 hover:bg-current/40"
                  )}
                  onClick={handleClose}
                >
                  <item.icon />
                  {item.name}
                </Link>
              );
            }
          })}
        </div>
      </div>
    </CustomSheet>
  );
};

export default MobileSidebar;
