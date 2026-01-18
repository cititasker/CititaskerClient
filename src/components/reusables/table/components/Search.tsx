"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  debounceMs?: number;
  clearable?: boolean;
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
}

const sizeClasses = {
  sm: "h-8 text-sm",
  default: "h-10",
  lg: "h-12 text-base",
};

const iconSizeClasses = {
  sm: "w-3 h-3",
  default: "w-4 h-4",
  lg: "w-5 h-5",
};

export const Search = ({
  value = "",
  onChange,
  placeholder = "Search...",
  className,
  inputClassName,
  debounceMs = 300,
  clearable = true,
  disabled = false,
  size = "default",
}: SearchProps) => {
  const [localValue, setLocalValue] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced search
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (onChange && localValue !== value) {
        onChange(localValue);
      }
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [localValue, onChange, value, debounceMs]);

  // Sync external value changes
  useEffect(() => {
    if (value !== localValue) {
      setLocalValue(value);
    }
  }, [value]);

  const handleClear = () => {
    setLocalValue("");
    onChange?.("");
  };

  return (
    <div className={cn("relative", className)}>
      <SearchIcon
        className={cn(
          "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
          iconSizeClasses[size]
        )}
      />

      <Input
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        disabled={disabled}
        className={cn(
          "pl-9",
          clearable && localValue && "pr-9",
          sizeClasses[size],
          inputClassName
        )}
      />

      {clearable && localValue && !disabled && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-muted"
        >
          <X className="w-3 h-3" />
        </Button>
      )}
    </div>
  );
};

export default Search;
