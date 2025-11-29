"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEFAULT_TIME_OPTIONS } from "@/constant";

interface ChartData {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface DoughnutChartProps {
  data?: ChartData[];
  title?: string;
  centerLabel?: string;
  centerValue?: string | number;
  className?: string;
  isLoading?: boolean;
  emptyMessage?: string;
  showTimeSelector?: boolean;
  timeValue?: string;
  onTimeChange?: (value: string) => void;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium">{payload[0].name}</p>
        <p className="text-xs text-muted-foreground">
          ₦{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const DoughnutChart = ({
  data = [],
  title = "Overview",
  centerLabel = "Total",
  centerValue,
  className,
  isLoading = false,
  emptyMessage = "No data available",
  showTimeSelector = false,
  timeValue,
  onTimeChange,
}: DoughnutChartProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const displayValue = centerValue !== undefined ? centerValue : total;
  const hasData = data.length > 0 && total > 0;

  if (isLoading) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <CardHeader className="pb-4 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {showTimeSelector && (
            <div className="w-40 h-9 bg-muted animate-pulse rounded-md" />
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="h-64 flex items-center justify-center">
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
        <CardContent className="space-y-6">
          <div className="h-64 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">{emptyMessage}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

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

      <CardContent className="space-y-6">
        {/* Chart */}
        <div className="relative h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={110} // bigger outer radius
                innerRadius={70}
                cornerRadius={4}
                paddingAngle={2}
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.id}
                    fill={entry.color}
                    stroke={entry.color}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-xs text-muted-foreground">{centerLabel}</p>
            <p className="text-xl font-bold">
              {typeof displayValue === "number"
                ? `₦${displayValue.toLocaleString()}`
                : displayValue}
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-4">
          {data.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{item.label}</p>
                <p className="text-xs text-muted-foreground">
                  ₦{item.value.toLocaleString()} (
                  {total > 0 ? ((item.value / total) * 100).toFixed(0) : 0}%)
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DoughnutChart;
