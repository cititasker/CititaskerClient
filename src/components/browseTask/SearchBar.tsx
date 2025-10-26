import React from "react";
import { Input } from "@/components/ui/input";
import { ISearch } from "@/constant/icons";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isSearching?: boolean;
  autoFocus?: boolean;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "search for a task...",
  isSearching = false,
  autoFocus = false,
  className,
}: SearchBarProps) {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className={cn("relative flex-1", className)}>
      <ISearch className="absolute top-0 bottom-0 my-auto ml-3 shrink-0" />
      <Input
        className="pl-10 bg-white w-full pr-20"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autoFocus}
      />

      <div className="absolute right-3 top-0 bottom-0 my-auto flex items-center gap-2">
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Clear search"
          >
            <X size={16} className="text-gray-400 hover:text-gray-600" />
          </button>
        )}

        {isSearching && (
          <div className="w-4 h-4 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        )}
      </div>
    </div>
  );
}
