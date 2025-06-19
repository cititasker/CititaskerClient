import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icons from "../Icons";
import { useState } from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  percentage: string | number;
}

const selectOptions = [
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
  { value: "year", label: "This year" },
];

export const DashboardCard = ({
  title,
  value,
  percentage,
}: DashboardCardProps) => {
  const [timeframe, setTimeframe] = useState("week");
  return (
    <Card className="h-[144px] flex flex-col justify-between rounded-2xl border border-[#F5F5F5] px-5 py-4">
      <CardHeader className="flex flex-row items-start justify-between p-0">
        <CardTitle className="text-sm text-black-2 font-normal">
          {title}
        </CardTitle>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[100px] h-8 text-xs !mt-0">
            <SelectValue placeholder="This week" />
          </SelectTrigger>
          <SelectContent>
            {selectOptions.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="flex justify-between items-center p-0 mt-4">
        <div className="text-2xl font-semibold text-black">{value}</div>
        <div className="flex items-center gap-2">
          <Icons.chartInc />
          <span className="text-sm text-muted-foreground">{percentage}%</span>
        </div>
      </CardContent>
    </Card>
  );
};
