"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface RatingProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
  size?: number;
  className?: string;
  starClassName?: string;
  enableHoverPreview?: boolean;
  labels?: string[];
  showLabel?: boolean;
}

const DEFAULT_LABELS = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

export default function Rating({
  value = 0,
  onChange,
  max = 5,
  readOnly = false,
  size = 20,
  className,
  starClassName,
  enableHoverPreview = true,
  labels = DEFAULT_LABELS,
  showLabel = true,
}: RatingProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (!readOnly && onChange) {
      onChange(index + 1);
    }
  };

  const displayValue =
    enableHoverPreview && hoveredIndex !== null ? hoveredIndex + 1 : value;
  const shouldShowLabel = !readOnly && showLabel && hoveredIndex !== null;

  return (
    <div
      className={cn("flex items-center gap-1.5 sm:gap-2", className)}
      onMouseLeave={() => !readOnly && setHoveredIndex(null)}
    >
      {Array.from({ length: max }, (_, index) => {
        const isFilled = index < displayValue;
        const isHovered = hoveredIndex === index;

        return (
          <div key={index} className="relative">
            <Star
              size={size}
              onClick={() => handleClick(index)}
              onMouseEnter={() =>
                !readOnly && enableHoverPreview && setHoveredIndex(index)
              }
              className={cn(
                "transition-all duration-200",
                isFilled
                  ? "fill-warning stroke-warning"
                  : readOnly
                  ? "fill-neutral-300 stroke-neutral-300"
                  : "fill-transparent stroke-neutral-900",
                !readOnly && "cursor-pointer hover:scale-110 active:scale-95",
                starClassName
              )}
              aria-label={`${index + 1} star${index === 0 ? "" : "s"}`}
            />

            {shouldShowLabel && isHovered && labels[index] && (
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs font-medium text-neutral-700 whitespace-nowrap animate-in fade-in slide-in-from-top-1 duration-200">
                {labels[index]}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
