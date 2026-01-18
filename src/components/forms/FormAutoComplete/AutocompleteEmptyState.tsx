import React from "react";
import { CommandEmpty } from "@/components/ui/command";
import { Search } from "lucide-react";

interface AutocompleteEmptyStateProps {
  emptyMessage?: string;
  searchQuery?: string;
  onClearSearch?: () => void;
}

export function AutocompleteEmptyState({
  emptyMessage = "No results found.",
  searchQuery,
  onClearSearch,
}: AutocompleteEmptyStateProps) {
  return (
    <CommandEmpty className="py-6 text-center">
      <div className="flex flex-col items-center gap-2">
        <Search className="h-8 w-8 text-text-muted opacity-50" />
        <p className="text-sm text-text-muted">{emptyMessage}</p>
        {searchQuery && onClearSearch && (
          <button
            type="button"
            onClick={onClearSearch}
            className="text-xs text-primary hover:underline"
          >
            Clear search
          </button>
        )}
      </div>
    </CommandEmpty>
  );
}
