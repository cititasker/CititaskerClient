"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, Search, Grid } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CategoryGroup } from "../types";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "@/components/forms/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePathname } from "next/navigation";
import FormButton from "@/components/forms/FormButton";
import { ROUTES } from "@/constant";

interface CategoryDropdownProps {
  categoryGroups: CategoryGroup[];
  isLoading: boolean;
}

export function CategoryDropdown({
  categoryGroups,
  isLoading,
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const pathname = usePathname();
  const isBrowseTaskPage = pathname.includes("/browse-task");

  const schema = z.object({
    searchTerm: z.string().min(3, "required"),
  });

  const methods = useForm({
    defaultValues: {
      searchTerm: "",
    },
    resolver: zodResolver(schema),
  });

  const searchTerm = methods.watch("searchTerm");

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

  // Function to handle expanding a group
  const handleExpandGroup = (groupCategory: string) => {
    setExpandedGroups((prev) => new Set([...prev, groupCategory]));
    // Optionally set search term to show more focused results
    methods.setValue("searchTerm", groupCategory);
  };

  // Function to determine how many children to show
  const getChildrenToShow = (group: CategoryGroup) => {
    const isExpanded = expandedGroups.has(group.category);
    const isSearchMatch =
      searchTerm.trim() &&
      group.category.toLowerCase().includes(searchTerm.toLowerCase());

    // If expanded or search matches the group name exactly, show all
    if (isExpanded || isSearchMatch) {
      return group.children;
    }

    // Otherwise show only first 5
    return group.children.slice(0, 5);
  };

  // Function to check if we should show the "more" button
  const shouldShowMoreButton = (group: CategoryGroup) => {
    const isExpanded = expandedGroups.has(group.category);
    const isSearchMatch =
      searchTerm.trim() &&
      group.category.toLowerCase().includes(searchTerm.toLowerCase());

    return !isExpanded && !isSearchMatch && group.children.length > 5;
  };

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
        className="w-[800px] p-0 rounded-xl shadow-xl border-0 bg-white"
        align="start"
        sideOffset={8}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-gray-100">
          <FormProvider {...methods}>
            <form>
              <FormInput
                name="searchTerm"
                icon={Search}
                autoFocus
                clearable
                placeholder="Search categories..."
                onClear={() => {
                  setExpandedGroups(new Set()); // Reset expanded groups on clear
                }}
              />
            </form>
          </FormProvider>
        </div>

        {/* Categories Grid */}
        <div className="max-h-96 overflow-y-auto p-4">
          {filteredGroups.length === 0 ? (
            <div className="text-center py-8">
              <Grid className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No categories found</p>
            </div>
          ) : (
            <div className="columns-2 gap-4 space-y-4">
              {filteredGroups.map((group, idx) => {
                const childrenToShow = getChildrenToShow(group);
                const showMoreButton = shouldShowMoreButton(group);

                return (
                  <div key={idx} className="break-inside-avoid mb-6 bg-white">
                    <div className="p-3">
                      <div className="mb-3">
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-sm text-gray-900 leading-tight">
                              {group.category}
                            </h4>
                            {expandedGroups.has(group.category) && (
                              <span className="text-xs text-primary font-normal block mt-0.5">
                                (showing all {group.children.length})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {childrenToShow.map((item, i) => (
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

                        {showMoreButton && (
                          <button
                            onClick={() => handleExpandGroup(group.category)}
                            className="block w-full text-left px-3 py-1 text-xs text-primary hover:bg-primary/5 rounded-md transition-colors font-medium"
                          >
                            +{group.children.length - 5} more
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Clear filters button when search is active or groups are expanded */}
        {(searchTerm.trim() || expandedGroups.size > 0) && (
          <div className="px-4 py-2 border-t border-gray-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                methods.setValue("searchTerm", "");
                setExpandedGroups(new Set());
              }}
              className="w-full text-xs text-gray-500 hover:text-gray-700"
            >
              Clear filters and show all categories
            </Button>
          </div>
        )}

        {/* Footer with View All button */}
        {!isBrowseTaskPage && (
          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <div className="flex justify-end">
              <FormButton
                text="View All"
                variant="default"
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white"
                href={`${ROUTES.BROWSE_TASK}`}
                onClick={() => setIsOpen(false)}
              />
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
