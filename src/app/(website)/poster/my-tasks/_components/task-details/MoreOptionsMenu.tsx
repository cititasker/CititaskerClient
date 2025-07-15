"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Icons from "@/components/Icons";

interface Props {
  moreOptions: { text: string; name: string }[];
  onSelect?: (item: { text: string; name: string }) => void;
}

export default function MoreOptionsMenu({ moreOptions, onSelect }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-[25px] font-normal border-none text-base bg-light-grey px-[15px] flex-1 justify-between"
        >
          More Options
          <Icons.dropdown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-full min-w-[200px]">
        {moreOptions.map((option, idx) => (
          <DropdownMenuItem
            key={idx}
            onSelect={() => {
              if (onSelect) onSelect(option);
            }}
          >
            {option.text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
