import React from "react";
import { cn } from "@/lib/utils";

interface ToolbarButtonProps {
  isActive?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  isActive,
  onClick,
  children,
  disabled = false,
  className = "",
}) => (
  <button
    type="button"
    onClick={onClick}
    onMouseDown={(e) => e.preventDefault()}
    disabled={disabled}
    className={cn(
      "h-8 w-8 p-0 rounded-md hover:bg-neutral-100 flex items-center justify-center",
      isActive && "bg-primary-50 text-primary",
      disabled && "opacity-50 cursor-not-allowed",
      className
    )}
  >
    {children}
  </button>
);

export default ToolbarButton;
