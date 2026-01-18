// DashboardCard.tsx - Enhanced with trends and better design
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string | number;
  percentage: number;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  className?: string;
}

const TREND_CONFIGS = {
  up: {
    icon: TrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  down: {
    icon: TrendingDown,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  neutral: {
    icon: Minus,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
  },
} as const;

export const DashboardCard = ({
  title,
  value,
  percentage,
  trend = "neutral",
  icon,
  className,
}: DashboardCardProps) => {
  const trendConfig = TREND_CONFIGS[trend];
  const TrendIcon = trendConfig.icon;

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md border-border-light",
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wide">
            {title}
          </h3>
          {icon && <div className="p-2 bg-primary/10 rounded-lg">{icon}</div>}
        </div>

        <div className="space-y-2">
          <div className="text-2xl font-bold text-text-primary">
            {typeof value === "number" ? value.toLocaleString() : value}
          </div>

          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                trendConfig.bgColor,
                trendConfig.color
              )}
            >
              <TrendIcon className="w-3 h-3" />
              <span>{percentage.toFixed(1)}%</span>
            </div>
            <span className="text-xs text-text-muted">vs last period</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
