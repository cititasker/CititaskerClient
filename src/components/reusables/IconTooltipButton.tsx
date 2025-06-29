"use client";

import React from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface IconTooltipButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const IconTooltipButton = ({
  icon,
  label,
  onClick,
}: IconTooltipButtonProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button type="button" aria-label={label} onClick={onClick}>
        {icon}
      </button>
    </TooltipTrigger>
    <TooltipContent>{label}</TooltipContent>
  </Tooltip>
);

export default IconTooltipButton;
