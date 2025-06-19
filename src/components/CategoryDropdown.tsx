"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavItem } from "./Navbar/nav";

interface Props {
  nav: NavItem;
}

export default function CategoryDropdown({ nav }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGroups = useMemo(() => {
    if (!searchTerm.trim()) return nav.children || [];

    return (nav.children || []).filter((group) => {
      const categoryMatch = group.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const hasMatchingChild = group.children.some((child) =>
        child.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return categoryMatch || hasMatchingChild;
    });
  }, [nav.children, searchTerm]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-base font-normal px-3 hover:bg-transparent hover:text-primary"
        >
          {nav.name}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        sideOffset={13}
        className="max-w-[1000px] w-full max-h-[600px] overflow-y-auto hide-scrollbar z-[100] p-10 rounded-[20px]"
      >
        {/* Sticky Search */}
        <div className="sticky top-0 bg-white pb-2 z-10">
          <Input
            placeholder="Search category or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-sm px-6"
          />
        </div>

        {/* Columns container */}
        {filteredGroups.length === 0 ? (
          <p className="text-sm text-muted-foreground mt-4">
            Category not found
          </p>
        ) : (
          <div
            className="
              columns-1
              sm:columns-2
              md:columns-3
              lg:columns-4
              gap-x-6
              gap-y-2
              mt-3
            "
          >
            {filteredGroups.map((group, idx) => (
              <div key={idx} className="break-inside-avoid mb-4">
                <DropdownMenuLabel className="text-xs uppercase text-black-2 tracking-wide mb-1">
                  {group.category}
                </DropdownMenuLabel>

                {group.children.map((item, i) => (
                  <DropdownMenuItem
                    key={i}
                    asChild
                    className="my-1 hover:!bg-transparent hover:!text-primary cursor-pointer"
                  >
                    <Link
                      href={item.href}
                      className="block px-2 py-1 text-sm hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
