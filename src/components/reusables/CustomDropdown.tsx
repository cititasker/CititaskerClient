import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface IProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  contentClassName?: string;
}
export default function CustomDropdown({
  children,
  trigger,
  contentClassName,
}: IProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none px-0.5">
          {trigger ?? <EllipsisVertical />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className={cn(
          "w-fit px-4 py-2 rounded-lg border shadow-[0px_4px_24px_-4px_rgba(16,24,40,0.08)]",
          contentClassName
        )}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
