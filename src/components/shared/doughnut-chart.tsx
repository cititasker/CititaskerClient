// DoughnutChart.tsx - Clean and responsive chart component
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

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
  centerValue?: string;
  className?: string;
}

const DEFAULT_DATA: ChartData[] = [
  { id: "completed", label: "Completed", value: 20, color: "var(--primary)" },
  { id: "pending", label: "Pending", value: 5, color: "var(--chart-5)" },
];

export const DoughnutChart = ({
  data = DEFAULT_DATA,
  title = "Task Overview",
  centerLabel = "Total Tasks",
  centerValue = "25",
  className,
}: DoughnutChartProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
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
                outerRadius={80}
                innerRadius={50}
                cornerRadius={4}
                paddingAngle={2}
              >
                {data.map((entry) => (
                  <Cell key={entry.id} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${value} tasks`,
                  name,
                ]}
                contentStyle={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xs text-text-muted">{centerLabel}</p>
            <p className="text-lg font-bold text-text-primary">{centerValue}</p>
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
              <div className="min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {item.label}
                </p>
                <p className="text-xs text-text-muted">
                  {item.value} ({((item.value / total) * 100).toFixed(0)}%)
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
