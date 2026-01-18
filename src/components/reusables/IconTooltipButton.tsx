"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import AppTooltip from "./AppTooltip";

interface IconTooltipButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;

  trigger?: "hover" | "click" | "manual";
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  delayDuration?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  tooltipClassName?: string;
  tooltipStyle?: React.CSSProperties;
  buttonClassName?: string;
  buttonStyle?: React.CSSProperties;

  showArrow?: boolean;
  arrowClassName?: string;
  arrowStyle?: React.CSSProperties;
}

const IconTooltipButton = React.forwardRef<
  HTMLButtonElement,
  IconTooltipButtonProps
>(
  (
    {
      icon,
      label,

      trigger = "hover",
      side,
      align,
      delayDuration,
      open,
      onOpenChange,

      tooltipClassName,
      tooltipStyle,

      showArrow,
      arrowClassName,
      arrowStyle,

      buttonClassName,
      buttonStyle,

      className,
      onClick,
      ...props
    },
    ref
  ) => (
    <AppTooltip
      content={label}
      triggerMode={trigger}
      side={side}
      align={align}
      delayDuration={delayDuration}
      open={open}
      onOpenChange={onOpenChange}
      tooltipClassName={tooltipClassName}
      tooltipStyle={tooltipStyle}
      showArrow={showArrow}
      arrowClassName={arrowClassName}
      arrowStyle={arrowStyle}
    >
      <button
        ref={ref}
        type="button"
        aria-label={label}
        onClick={onClick}
        style={buttonStyle}
        className={cn(
          "inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 transition",
          buttonClassName,
          className
        )}
        {...props}
      >
        {icon}
      </button>
    </AppTooltip>
  )
);

IconTooltipButton.displayName = "IconTooltipButton";

export default IconTooltipButton;
