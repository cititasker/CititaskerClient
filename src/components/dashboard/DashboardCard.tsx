import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icons from "../Icons";

interface DashboardCardProps {
  title: string;
  value: string | number;
  percentage: string | number;
}

export const DashboardCard = ({
  title,
  value,
  percentage,
}: DashboardCardProps) => {
  return (
    <Card className="h-[144px] flex flex-col justify-between rounded-2xl border border-[#F5F5F5] px-5 py-4">
      <CardHeader className="p-0">
        <CardTitle className="text-sm text-black-2 font-normal">
          {title}
        </CardTitle>
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
