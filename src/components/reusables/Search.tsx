import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { SearchIcon, X } from "lucide-react";
import { Input } from "../ui/input";

interface SearchProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  className?: string;
  showCancel?: boolean;
  onReset?: () => void;
}

const Search = forwardRef<HTMLInputElement, SearchProps>(
  (
    { value, onChange, placeholder = "Search", showCancel, onReset, className },
    ref
  ) => {
    return (
      <div className={cn("relative w-full max-w-[356px] h-10", className)}>
        <SearchIcon
          size={14}
          className="absolute top-1/2 left-3 z-10 -translate-y-1/2"
        />
        <div className="relative h-full">
          <Input
            ref={ref}
            placeholder={placeholder}
            className="placeholder:text-neutral h-full w-full px-8 text-sm font-medium"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
          />
          {value && showCancel && (
            <button
              onClick={onReset}
              className="focus:outline-none absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Search.displayName = "Search";

export default Search;
