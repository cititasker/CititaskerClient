import React from "react";
import { CommandInput } from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface AutocompleteSearchProps {
  searchable?: boolean;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_CONFIG = {
  sm: { input: "text-sm" },
  md: { input: "text-sm" },
  lg: { input: "text-base" },
} as const;

export function AutocompleteSearch({
  searchable = true,
  searchQuery,
  onSearchQueryChange,
  placeholder = "Search options",
  size = "md",
}: AutocompleteSearchProps) {
  const sizeConfig = SIZE_CONFIG[size];

  if (!searchable) return null;

  return (
    <div className="flex items-center border-b border-neutral-100">
      <CommandInput
        placeholder={placeholder}
        value={searchQuery}
        onValueChange={onSearchQueryChange}
        className={cn(
          "border-none focus:ring-0 bg-transparent placeholder:text-text-muted w-full",
          "text-text-primary p-0",
          sizeConfig.input
        )}
      />
    </div>
  );
}
