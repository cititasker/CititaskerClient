"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, Search, Grid } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CategoryGroup } from "../types";

interface CategoryDropdownProps {
  categoryGroups: CategoryGroup[];
  isLoading: boolean;
}

export function CategoryDropdown({
  categoryGroups,
  isLoading,
}: CategoryDropdownProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredGroups = useMemo(() => {
    if (!searchTerm.trim()) return categoryGroups.slice(0, 8); // Limit initial display

    return categoryGroups.filter((group) => {
      const categoryMatch = group.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const hasMatchingChild = group.children.some((child) =>
        child.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return categoryMatch || hasMatchingChild;
    });
  }, [categoryGroups, searchTerm]);

  if (isLoading) {
    return (
      <Button variant="ghost" className="flex items-center gap-2" disabled>
        <Grid className="w-4 h-4" />
        <span>Categories</span>
        <ChevronDown className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 hover:bg-primary/10 hover:text-primary"
        >
          <Grid className="w-4 h-4" />
          <span>Categories</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[600px] p-0 rounded-xl shadow-xl border-0 bg-white"
        align="start"
        sideOffset={8}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-200 focus:border-primary"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="max-h-96 overflow-y-auto p-4">
          {filteredGroups.length === 0 ? (
            <div className="text-center py-8">
              <Grid className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No categories found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filteredGroups.map((group, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="font-semibold text-sm text-gray-900 flex items-center gap-2 px-3 py-1">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    {group.category}
                  </h4>
                  <div className="space-y-1">
                    {group.children.slice(0, 5).map((item, i) => (
                      <DropdownMenuItem key={i} asChild className="p-0">
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                        >
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    {group.children.length > 5 && (
                      <button
                        onClick={() => setSearchTerm(group.category)}
                        className="block w-full text-left px-3 py-1 text-xs text-primary hover:bg-primary/5 rounded-md"
                      >
                        +{group.children.length - 5} more
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
