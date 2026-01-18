"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { DEFAULT_TIME_OPTIONS } from "@/constant";

interface HeaderSectionProps {
  title: string;
  subtitle?: string;
  showTimeSelector?: boolean;
  timeValue?: string;
  onTimeChange?: (value: string) => void;
  timeOptions?: Array<{ value: string; label: string }>;
  actions?: React.ReactNode[];
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  stackOnMobile?: boolean;
}

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

export const HeaderSection = ({
  title,
  subtitle,
  showTimeSelector = false,
  timeValue,
  onTimeChange,
  timeOptions = DEFAULT_TIME_OPTIONS,
  actions = [],
  className,
  titleClassName,
  subtitleClassName,
  stackOnMobile = true,
}: HeaderSectionProps) => {
  const processedTitle = title.replace("{greeting}", getGreeting());
  const hasRightContent = showTimeSelector || actions.length > 0;

  return (
    <Card
      className={cn(
        "flex justify-between items-start gap-4 bg-white p-6",
        stackOnMobile &&
          hasRightContent &&
          "flex-col sm:flex-row sm:items-center",
        !stackOnMobile && "items-center",
        className
      )}
    >
      <div className="space-y-1 min-w-0 flex-1">
        <h1
          className={cn(
            "text-2xl font-bold text-foreground leading-tight",
            titleClassName
          )}
        >
          {processedTitle}
        </h1>
        {subtitle && (
          <p
            className={cn(
              "text-muted-foreground leading-relaxed",
              subtitleClassName
            )}
          >
            {subtitle}
          </p>
        )}
      </div>

      {hasRightContent && (
        <div className="flex items-center gap-3 flex-shrink-0">
          {actions}
          {showTimeSelector && (
            <Select value={timeValue} onValueChange={onTimeChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      )}
    </Card>
  );
};

// Preset configurations
export const DashboardHeader = ({
  userName,
  timeValue,
  onTimeChange,
  actions,
  ...props
}: Omit<HeaderSectionProps, "title" | "subtitle"> & {
  userName?: string;
  timeValue?: string;
  onTimeChange?: (value: string) => void;
}) => (
  <HeaderSection
    title={`{greeting}, ${userName || "Guest"}!`}
    subtitle="Here's what's happening with your tasks today."
    showTimeSelector
    timeValue={timeValue}
    onTimeChange={onTimeChange}
    actions={actions}
    {...props}
  />
);

export const PageHeader = ({
  title,
  subtitle,
  actions,
  ...props
}: HeaderSectionProps) => (
  <HeaderSection
    title={title}
    subtitle={subtitle}
    actions={actions}
    stackOnMobile={false}
    {...props}
  />
);

export default HeaderSection;
