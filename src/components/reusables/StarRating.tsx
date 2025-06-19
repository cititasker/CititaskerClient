import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
  size?: number;
};

export const StarRating = ({
  value,
  onChange,
  max = 5,
  readOnly = false,
  size = 20,
}: Props) => {
  const handleClick = (index: number) => {
    if (readOnly || !onChange) return;
    onChange(index + 1);
  };

  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: max }).map((_, index) => (
        <Star
          key={index}
          size={size}
          onClick={() => handleClick(index)}
          className={cn(
            "cursor-pointer transition-all",
            index < value
              ? "fill-yellow-400 stroke-yellow-400"
              : "stroke-muted",
            readOnly && "cursor-default"
          )}
        />
      ))}
    </div>
  );
};
