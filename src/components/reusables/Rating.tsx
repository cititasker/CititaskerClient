"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  value: number | undefined;
  onChange?: (value: number) => void;
  max?: number; // total stars, defaults to 5
  readOnly?: boolean;
  size?: number;
  className?: string;
};

const Rating = ({
  value = 0,
  onChange,
  max = 5,
  readOnly = false,
  size = 20,
  className,
}: Props) => {
  const handleClick = (index: number) => {
    if (readOnly || !onChange) return;
    onChange(index + 1);
  };

  return (
    <div className={cn("flex gap-1 items-center", className)}>
      {Array.from({ length: max }).map((_, index) => {
        const isFilled = index < value;

        return (
          <Star
            key={index}
            size={size}
            onClick={() => handleClick(index)}
            className={cn(
              "transition-colors",
              isFilled
                ? "fill-yellow-state-color stroke-yellow-state-color"
                : "fill-[#D5D5D5] stroke-[#D5D5D5]",
              !readOnly && "cursor-pointer hover:scale-110",
              readOnly && "cursor-default"
            )}
          />
        );
      })}
    </div>
  );
};

export default Rating;
