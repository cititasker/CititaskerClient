"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Select } from "../reusables/Select";

const data = [
  { id: 1, value: 5, label: "Pending Payment" },
  { id: 2, value: 20, label: "Completed Payment" },
];

const COLORS = ["var(--chart-5)", "var(--primary)"];

const LEGENDS = [
  { label: "Completed", colorClass: "bg-primary" },
  { label: "Pending", colorClass: "bg-[var(--chart-5)]" },
];

export const DoughnutChart: React.FC = () => {
  return (
    <Card className="max-w-[288px] p-0 w-full rounded-2xl border flex flex-col overflow-hidden shadow-none px-[14px] pt-[18px]">
      <CardHeader className="flex justify-end p-0">
        <Select
          containerClassName="w-fit self-end"
          size="md"
          value="weekly"
          options={[
            { label: "This week", value: "weekly" },
            { label: "This year", value: "yearly" },
          ]}
        />
      </CardHeader>

      <CardContent className="flex flex-col gap-6 px-0">
        <div className="relative min-h-[250px]">
          <ResponsiveContainer width="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={55}
                cornerRadius={5}
              >
                {data.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                wrapperClassName="z-50"
                wrapperStyle={{ zIndex: 9999 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
            <p>Total Expenses</p>
            <p className="text-sm font-bold">₦200,000</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mx-auto">
          {LEGENDS.map(({ label, colorClass }) => (
            <div key={label} className="flex items-center gap-2">
              <div className={cn("w-3 h-3 rounded-full", colorClass)} />
              <p className="text-xs">{label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
