import React from "react";
import { CommandInput } from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface AutocompleteSearchProps {
  searchable?: boolean;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  label?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_CONFIG = {
  sm: { input: "text-sm py-2" },
  md: { input: "text-sm py-3" },
  lg: { input: "text-base py-4" },
} as const;

export function AutocompleteSearch({
  searchable = true,
  searchQuery,
  onSearchQueryChange,
  label,
  size = "md",
}: AutocompleteSearchProps) {
  const sizeConfig = SIZE_CONFIG[size];

  if (!searchable) return null;

  return (
    <div className="flex items-center border-b border-neutral-100 px-3">
      <CommandInput
        placeholder={`Search ${label?.toLowerCase() || "options"}...`}
        value={searchQuery}
        onValueChange={onSearchQueryChange}
        className={cn(
          "border-none focus:ring-0 bg-transparent placeholder:text-text-muted",
          "text-text-primary px-0",
          sizeConfig.input
        )}
      />
    </div>
  );
}
