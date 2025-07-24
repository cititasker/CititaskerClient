"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

type Props = {
  value: number | undefined;
  onChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
  size?: number;
  className?: string;
  starClassName?: string;
  enableHoverPreview?: boolean;
  labels?: string[]; // NEW: custom labels
  showlabel?: boolean;
  starOuterClassName?: string;
};

const defaultLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

const Rating = ({
  value = 0,
  onChange,
  max = 5,
  readOnly = false,
  size = 20,
  className,
  starClassName,
  enableHoverPreview = true,
  labels = defaultLabels,
  showlabel = true,
  starOuterClassName,
}: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (readOnly || !onChange) return;
    onChange(index + 1);
  };

  const handleMouseEnter = (index: number) => {
    if (readOnly || !enableHoverPreview) return;
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    if (readOnly || !enableHoverPreview) return;
    setHoveredIndex(null);
  };

  return (
    <div
      className={cn("flex gap-3 items-start", className)}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: max }).map((_, index) => {
        const isFilled =
          enableHoverPreview && hoveredIndex !== null
            ? index <= hoveredIndex
            : index < value;

        const shouldShowLabel =
          !readOnly &&
          showlabel &&
          ((hoveredIndex !== null && index === hoveredIndex) ||
            (hoveredIndex === null && value === index + 1));

        return (
          <div
            key={index}
            className={cn(
              "relative flex flex-col items-center",
              showlabel && !readOnly && "mb-5",
              starOuterClassName
            )}
          >
            <Star
              size={size}
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              className={cn(
                "transition-color stroke-transparent stroke-[0.8px]",
                isFilled
                  ? "fill-yellow-state-color stroke-yellow-state-color"
                  : "fill-transparent stroke-black",
                !readOnly && "cursor-pointer hover:scale-110",
                readOnly && "cursor-default fill-[#D5D5D5] stroke-[#D5D5D5]",
                starClassName
              )}
            />
            <div
              className={cn(
                "absolute top-full text-xs mt-1 transition-opacity duration-200 w-0 whitespace-nowrap flex justify-center",
                shouldShowLabel ? "opacity-100" : "opacity-0 h-0"
              )}
            >
              {labels[index] || ""}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
