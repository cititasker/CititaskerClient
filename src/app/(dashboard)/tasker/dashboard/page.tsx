"use client";
import dynamic from "next/dynamic";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { columns } from "../column";
import { DashboardHeader } from "@/components/reusables/table/components/HeaderSection";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/reusables/table/components/DataTable";
import { useDashboardStats } from "@/components/dashboard/hooks/useDashboardStats";
import { DashboardCardSkeleton } from "@/components/dashboard/DashboardCardSkeleton";
import { useMemo } from "react";
import { API_ROUTES } from "@/constant";
import {
  getMonthlyFinancialSummary,
  getRecentTasks,
  getTransactionAnalysis,
} from "@/services/dashboard/dashboard.api";
import { useBaseQuery } from "@/hooks/useBaseQuery";
import { usePaginatedTable } from "@/hooks/usePaginatedTable";
import { formatISODate, getPartialInitials } from "@/utils";
import { useExpenseChartData } from "@/components/shared/charts/hooks.ts/useExpenseChartData";
import { useTimeframe } from "@/components/dashboard/hooks/useTimeframe";

const DoughnutChart = dynamic(
  () => import("@/components/shared/charts/doughnut-chart"),
  {
    loading: () => (
      <Card className="p-6 h-[400px] animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-[300px] bg-gray-100 rounded"></div>
      </Card>
    ),
    ssr: false,
  }
);

const AmountAreaChart = dynamic(
  () => import("@/components/shared/charts/amount-chart"),
  {
    loading: () => (
      <Card className="p-6 h-[400px] lg:col-span-2 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-[300px] bg-gray-100 rounded"></div>
      </Card>
    ),
    ssr: false,
  }
);

export default function Page() {
  const { user, role, dashboardStats, statsLoading } = useDashboardStats();
  const { timeframe, setTimeframe } = useTimeframe();

  const { queryParams, pagination, onPaginationChange } = usePaginatedTable({
    defaultPageSize: 5,
    resetPageOnChange: true,
  });

  const query = useMemo(() => {
    const { limit, ...rest } = queryParams;
    return {
      per_page: limit,
      ...rest,
    };
  }, [queryParams]);

  // Recent Tasks
  const { data: recentTasksData, isLoading: taskLoading } = useBaseQuery(
    [API_ROUTES.RECENT_TASKS, role, queryParams],
    () => getRecentTasks({ role, params: query }),
    { enabled: !!role }
  );

  // Expense Analysis
  const { data: expensesData, isLoading: expenseLoading } = useBaseQuery(
    [API_ROUTES.POSTER_EXPENSE_ANALYSIS, role, timeframe],
    () =>
      getTransactionAnalysis({
        role,
        params: { time_range: timeframe },
      }),
    { enabled: !!role }
  );

  // Amount Spent/Earned Analysis
  const { data: amountData, isLoading: amountLoading } = useBaseQuery(
    [API_ROUTES.AMOUNT_ANALYSIS(role), role, timeframe],
    () =>
      getMonthlyFinancialSummary({
        role,
        params: { time_range: timeframe },
      }),
    { enabled: !!role }
  );

  // Transform expense data for expense chart
  const { chartData: expenseChartData, total: totalExpense } =
    useExpenseChartData(expensesData, role);

  const recentTasks = recentTasksData?.data || [];
  const totalDocuments = recentTasksData?.total;
  const totalPages = recentTasksData?.last_page;

  const tableData = useMemo(() => {
    return recentTasks.map((el: any, i: number) => ({
      id: el.id,
      sn: pagination.pageIndex * pagination.pageSize + (i + 1),
      name: el.name,
      poster: getPartialInitials(el?.poster?.profile),
      location: el.address,
      date: formatISODate(el.date, "MMM DD, YYYY hh:mm a"),
      status: el.status,
      role,
    }));
  }, [recentTasks, pagination.pageIndex, pagination.pageSize, role]);

  return (
    <div className="space-y-8">
      <DashboardHeader
        userName={user.first_name ?? ""}
        timeValue={timeframe}
        onTimeChange={setTimeframe}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsLoading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <DashboardCardSkeleton key={idx} />
            ))
          : dashboardStats.map((stat) => (
              <DashboardCard key={stat.title} {...stat} />
            ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Amount Area Chart */}
        <AmountAreaChart
          data={amountData || []}
          title="Amount Earned"
          isLoading={amountLoading}
          emptyMessage="No earnings data available"
          role={role}
          className="lg:col-span-2"
        />

        {/* Expense Doughnut Chart */}
        <DoughnutChart
          data={expenseChartData}
          title="Earnings Overview"
          centerLabel="Total Earnings"
          centerValue={totalExpense}
          isLoading={expenseLoading}
          emptyMessage="No earnings data available"
        />
      </div>

      <Card className="space-y-6 p-5">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Recent Activity</h2>
          <p className="text-muted-foreground">
            View and manage your recent task activities
          </p>
        </div>

        <DataTable
          data={tableData}
          columns={columns}
          pageSize={pagination.pageSize}
          isLoading={taskLoading}
          totalCount={totalDocuments}
          pageCount={totalPages}
          manualPagination
          onPaginationChange={onPaginationChange}
          showPagination={false}
          showTableCount
          enableRowSelection
        />
      </Card>
    </div>
  );
}
