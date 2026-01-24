"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Download, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { ColumnFiltersState } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import FilterDrawer from "./components/FilterDrawer";
import Search from "../Search";
import FormButton from "@/components/forms/FormButton";

interface SearchAndFilterBarProps {
  // Search props
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;

  // Filter props
  filters?: ColumnFiltersState;
  onFiltersChange?: (filters: ColumnFiltersState) => void;

  // Reset functionality
  onReset?: () => void;
  hasActiveFilters?: boolean;

  // Export functionality
  onExport?: (format: "csv" | "excel" | "pdf") => void;

  // Additional actions
  extraActions?: React.ReactNode[];

  // Layout
  className?: string;
  compact?: boolean;
}

export const SearchAndFilterBar = ({
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = [],
  // onFiltersChange,
  onReset,
  hasActiveFilters = false,
  onExport,
  extraActions = [],
  className,
  compact = false,
}: SearchAndFilterBarProps) => {
  const [localSearchValue, setLocalSearchValue] = useState(searchValue);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (onSearchChange && localSearchValue !== searchValue) {
        onSearchChange(localSearchValue);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [localSearchValue, onSearchChange, searchValue]);

  // Sync external search value changes
  useEffect(() => {
    if (searchValue !== localSearchValue) {
      setLocalSearchValue(searchValue);
    }
  }, [searchValue]);

  const activeFiltersCount = filters?.length || 0;

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        compact && "gap-2",
        className,
      )}
    >
      {/* Search Section */}
      <div className="flex flex-1 gap-2 min-w-0">
        <Search
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onSearchChange}
          showCancel
          onReset={onReset}
        />
        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <Badge variant="default" className="hidden sm:flex">
              {activeFiltersCount} filter{activeFiltersCount !== 1 ? "s" : ""}{" "}
              active
            </Badge>
            <FormButton
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-muted-foreground hover:text-foreground"
              icon={<RotateCcw className="w-4 h-4" />}
            >
              {compact ? "" : "Clear"}
            </FormButton>
          </div>
        )}
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* <FilterDrawer
          filters={[]}
          onFiltersChange={
            onFiltersChange ??
            ((field) => {
              console.log("Field", field);
            })
          }
          title="Mixed Components Filter"
        >
          <div>Hello</div>
        </FilterDrawer> */}

        {/* Export Dropdown */}
        {onExport && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                {compact ? "" : "Export"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onExport("csv")}>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport("excel")}>
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport("pdf")}>
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Extra Actions */}
        {extraActions.length > 0 && (
          <>
            {extraActions.slice(0, 2).map((action, index) => (
              <React.Fragment key={index}>{action}</React.Fragment>
            ))}

            {extraActions.length > 2 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {extraActions.slice(2).map((action, index) => (
                    <DropdownMenuItem key={index + 2} asChild>
                      {action}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilterBar;
