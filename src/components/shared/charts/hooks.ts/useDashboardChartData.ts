import { useMemo } from "react";

interface DashboardStatItem {
  title: string;
  value: number;
  percentage: number;
  trend: "up" | "down";
}

interface ChartData {
  id: string;
  label: string;
  value: number;
  color: string;
}

const CHART_COLORS: Record<string, string> = {
  "Completed Tasks": "#10b981", // green
  "Assigned Tasks": "#f59e0b", // amber
  "Open Tasks": "#3b82f6", // blue
};

export const useDashboardChartData = (
  stats: DashboardStatItem[]
): ChartData[] => {
  return useMemo(() => {
    return stats.map((stat) => ({
      id: stat.title.toLowerCase().replace(/\s+/g, "-"),
      label: stat.title.replace(" Tasks", ""),
      value: stat.value,
      color: CHART_COLORS[stat.title] || "#6b7280",
    }));
  }, [stats]);
};
