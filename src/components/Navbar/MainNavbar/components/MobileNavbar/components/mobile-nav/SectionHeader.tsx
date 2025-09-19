import { cn } from "@/utils";
import { ChevronDown } from "lucide-react";
import React from "react";

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  isOpen?: boolean;
  onClick?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  title,
  isOpen,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 p-4 cursor-pointer transition-all duration-200",
      "hover:bg-primary-50 active:bg-primary-100",
      isOpen && "bg-primary-50 text-primary-700"
    )}
  >
    <div className="w-5 h-5 text-current">{icon}</div>
    <span className="font-medium">{title}</span>
    {onClick && (
      <ChevronDown
        className={cn(
          "w-4 h-4 ml-auto transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    )}
  </div>
);
