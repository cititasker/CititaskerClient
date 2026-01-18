// components/shared/charts/amount-area-chart.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEFAULT_TIME_OPTIONS } from "@/constant";
import { cn } from "@/lib/utils";

interface ChartDataPoint {
  month: string;
  amount: number;
}

interface AmountAreaChartProps {
  data?: ChartDataPoint[];
  title?: string;
  className?: string;
  isLoading?: boolean;
  emptyMessage?: string;
  showTimeSelector?: boolean;
  timeValue?: string;
  onTimeChange?: (value: string) => void;
  role?: "poster" | "tasker";
}

const CustomTooltip = ({ active, payload, role }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium mb-1">{payload[0].payload.month}</p>
        <p className="text-xs text-muted-foreground">
          {role === "poster" ? "Amount Spent" : "Amount Earned"}:{" "}
          <span className="font-semibold text-foreground">
            ₦{payload[0].value.toLocaleString()}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const AmountAreaChart = ({
  data = [],
  title = "Activity Overview",
  className,
  isLoading = false,
  emptyMessage = "No data available",
  showTimeSelector = false,
  timeValue,
  onTimeChange,
  role = "poster",
}: AmountAreaChartProps) => {
  const hasData = data.length > 0;

  if (isLoading) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <CardHeader className="pb-4 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {showTimeSelector && (
            <div className="w-28 h-9 bg-muted animate-pulse rounded-md" />
          )}
        </CardHeader>
        <CardContent className="h-80">
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!hasData) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <CardHeader className="pb-4 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {showTimeSelector && timeValue && onTimeChange && (
            <Select value={timeValue} onValueChange={onTimeChange}>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                {DEFAULT_TIME_OPTIONS.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </CardHeader>
        <CardContent className="h-80">
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-muted-foreground">{emptyMessage}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Chart colors based on role
  const chartColor = "#236F8E";

  // Shorten month names for better display
  const formattedData = data.map((item) => ({
    ...item,
    shortMonth: item.month.substring(0, 3), // Jan, Feb, Mar, etc.
  }));

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {showTimeSelector && timeValue && onTimeChange && (
          <Select value={timeValue} onValueChange={onTimeChange}>
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              {DEFAULT_TIME_OPTIONS.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardHeader>

      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formattedData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id={`colorAmount-${role}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.4} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              opacity={0.3}
            />
            <XAxis
              dataKey="shortMonth"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              interval={0}
              angle={0}
              height={50}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              content={<CustomTooltip role={role} />}
              cursor={{
                stroke: chartColor,
                strokeWidth: 1,
                strokeDasharray: "5 5",
              }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke={chartColor}
              strokeWidth={2}
              fill="#236F8E"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AmountAreaChart;
