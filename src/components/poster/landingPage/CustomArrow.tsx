"use client";
import React from "react";
import { HiMiniChevronLeft, HiMiniChevronRight } from "react-icons/hi2";
import { motion } from "framer-motion";
import { cn } from "@/utils";

interface CustomArrowProps {
  direction?: "left" | "right";
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const CustomArrow: React.FC<CustomArrowProps> = ({
  direction = "left",
  onClick,
  className,
  style,
}) => {
  const isLeft = direction === "left";

  const baseClasses = cn(
    // Base styles
    "absolute z-[2] cursor-pointer select-none",
    "flex items-center justify-center",
    "w-10 h-10 md:w-12 md:h-12",
    "rounded-full shadow-lg",

    // Glass morphism effect
    "glass-effect backdrop-blur-md",
    "border border-white/20",

    // Positioning - using percentage for better carousel compatibility
    isLeft ? "left-[2%]" : "right-[2%]",
    "top-1/2 -translate-y-1/2",

    // Hover and transition effects
    "transition-all duration-300 ease-out",
    "hover:scale-110 hover:shadow-xl",
    "hover:bg-white/20",
    "active:scale-95",

    // Focus styles for accessibility
    "focus:outline-none focus:ring-2 focus:ring-white/50",

    className,
  );

  const iconClasses = cn(
    "text-white text-xl md:text-2xl",
    "drop-shadow-sm",
    "transition-transform duration-200",
    "group-hover:scale-110",
  );

  const Icon = isLeft ? HiMiniChevronLeft : HiMiniChevronRight;

  return (
    <motion.button
      className={`${baseClasses} group`}
      onClick={onClick}
      style={style}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      aria-label={`${direction === "left" ? "Previous" : "Next"} slide`}
      type="button"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-30 rounded-full transition-opacity duration-300" />

      {/* Icon */}
      <Icon className={iconClasses} />
    </motion.button>
  );
};

export default CustomArrow;
