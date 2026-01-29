"use client";

import * as React from "react";
import {
  Avatar as ShadcnAvatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { cn } from "@/utils";

interface AvatarProps {
  src?: string | null;
  alt?: string;
  name?: string; // Used for fallback initials
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  fallbackClassName?: string;
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

function getInitials(name?: string) {
  if (!name) return "U";

  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0]?.toUpperCase();

  return parts[0][0]?.toUpperCase() + parts[parts.length - 1][0]?.toUpperCase();
}

export default function Avatar({
  src,
  alt,
  name,
  size = "md",
  className,
  fallbackClassName,
}: AvatarProps) {
  return (
    <ShadcnAvatar
      className={cn(
        "select-none bg-red-500 text-muted-foreground",
        sizeClasses[size],
        className,
      )}
    >
      {src && <AvatarImage src={src} alt={alt || name || "Avatar"} />}
      <AvatarFallback className={fallbackClassName}>
        {getInitials(name)}
      </AvatarFallback>
    </ShadcnAvatar>
  );
}
