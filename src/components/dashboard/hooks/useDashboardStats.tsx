import { API_ROUTES } from "@/constant";
import { useBaseQuery } from "@/hooks/useBaseQuery";
import { getDashboardStats } from "@/services/dashboard/dashboard.api";
import { useAppSelector } from "@/store/hook";
import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type DashboardStatItem = {
  title: string;
  value: number;
  percentage: number;
  trend: "up" | "down";
};

type StatKey = "completed_task" | "assigned_task" | "open_task";

const STAT_CONFIG: Record<StatKey, string> = {
  completed_task: "Completed Tasks",
  assigned_task: "Assigned Tasks",
  open_task: "Open Tasks",
};

const DEFAULT_TIMEFRAME = "last-7-days";

export const useDashboardStats = () => {
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();
  const searchParams = useSearchParams();

  const timeframe = searchParams.get("timeframe") || DEFAULT_TIMEFRAME;
  const role = user?.role as TRole;

  const { data: stats, isLoading: statsLoading } = useBaseQuery(
    [API_ROUTES.DASHBOARD_STATS, role, timeframe],
    () => getDashboardStats({ role, time_range: timeframe }),
    { enabled: !!role },
  );

  const dashboardStats = useMemo<DashboardStatItem[]>(() => {
    if (!stats) return [];

    return Object.entries(STAT_CONFIG).map(([key, title]) => {
      const stat = stats[key as StatKey];
      return {
        title,
        value: stat.count,
        percentage: stat.percentage,
        trend: stat.percentage >= 0 ? "up" : "down",
      };
    });
  }, [stats]);

  const setTimeframe = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("timeframe", value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return {
    user,
    role,
    statsLoading,
    dashboardStats,
    timeframe,
    setTimeframe,
  };
};
