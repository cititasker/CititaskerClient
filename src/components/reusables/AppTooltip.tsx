"use client";

import React from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

export interface AppTooltipProps {
  children: React.ReactNode; // trigger element
  content: React.ReactNode; // tooltip body

  triggerMode?: "hover" | "click" | "manual";

  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  delayDuration?: number;
  sideOffset?: number;

  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  tooltipClassName?: string;
  tooltipStyle?: React.CSSProperties;

  showArrow?: boolean;
  arrowClassName?: string;
  arrowStyle?: React.CSSProperties;
}

export const AppTooltip = ({
  children,
  content,
  triggerMode = "hover",
  side = "bottom",
  align = "center",
  sideOffset = 5,
  delayDuration = 100,

  open,
  onOpenChange,

  tooltipClassName,
  tooltipStyle,

  showArrow = true,
  arrowClassName,
  arrowStyle,
}: AppTooltipProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenChange = (state: boolean) => {
    if (triggerMode === "manual") return;
    setIsOpen(state);
    onOpenChange?.(state);
  };

  const resolvedOpen = triggerMode === "manual" ? open : isOpen ?? false;

  const resolvedArrowColor = (tooltipStyle?.background as string) ?? "#111827";

  return (
    <Tooltip
      open={resolvedOpen}
      onOpenChange={handleOpenChange}
      delayDuration={delayDuration}
    >
      <TooltipTrigger asChild>{children}</TooltipTrigger>

      <TooltipContent
        side={side}
        align={align}
        style={tooltipStyle}
        sideOffset={sideOffset}
        className={cn(
          "text-sm px-2.5 py-1 bg-gray-900 text-white rounded shadow-md z-50",
          tooltipClassName
        )}
      >
        {content}

        {showArrow && (
          <TooltipArrow
            className={arrowClassName}
            style={{
              fill: resolvedArrowColor,
              ...arrowStyle,
            }}
          />
        )}
      </TooltipContent>
    </Tooltip>
  );
};

export default AppTooltip;
