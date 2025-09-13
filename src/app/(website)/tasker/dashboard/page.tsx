"use client";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { CustomTable } from "@/components/reusables/table/CustomTable";
import { useAppSelector } from "@/store/hook";
import { columns, RecentTask } from "./_components/column";
import { DoughnutChart } from "@/components/shared/doughnut-chart";
import { useState } from "react";
import { DashboardHeader } from "@/components/reusables/table/components/HeaderSection";
import { useTableState } from "@/components/reusables/table/hooks/useTableState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Search from "@/components/reusables/table/components/Search";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import FilterDrawer from "@/components/reusables/table/components/FilterDrawer";
import { DataTable } from "@/components/reusables/table/components/DataTable";
import Filter from "./_components/Filter";

const DASHBOARD_STATS = [
  {
    title: "Completed Tasks",
    value: 18,
    percentage: 90.78,
    trend: "up" as const,
  },
  {
    title: "Pending Tasks",
    value: 5,
    percentage: 45.12,
    trend: "down" as const,
  },
  {
    title: "Overdue Tasks",
    value: 2,
    percentage: 12.34,
    trend: "up" as const,
  },
];

export default function Page() {
  const { user } = useAppSelector((state) => state.user);
  const [timeframe, setTimeframe] = useState("week");

  // Table state management
  const {
    tableState,
    setSearch,
    setColumnFilters,
    resetAll,
    hasActiveFilters,
  } = useTableState(10);

  // Mock data
  const mockRecentTasks: RecentTask[] = [
    {
      sn: "#3066",
      poster: "Alice Johnson",
      location: "Idimu, Lagos",
      date: "12-08-2025",
      status: "pending",
    },
    {
      sn: "#3065",
      poster: "Bob Smith",
      location: "Victoria Island",
      date: "11-08-2025",
      status: "completed",
    },
  ];

  return (
    <div className="space-y-8">
      <DashboardHeader
        userName={user.first_name ?? ""}
        timeValue={timeframe}
        onTimeChange={setTimeframe}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DASHBOARD_STATS.map((stat) => (
          <DashboardCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            percentage={stat.percentage}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <div className="flex items-center justify-center h-full bg-background-secondary/50 rounded-lg">
              <p className="text-text-muted">Activity Chart Coming Soon</p>
            </div>
          </CardContent>
        </Card>

        <DoughnutChart />
      </div>

      <Card className="space-y-6 p-5">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Recent Activity</h2>
          <p className="text-muted-foreground">
            View and manage your recent task activities
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 max-w-md">
            <Search
              value={tableState.search}
              onChange={setSearch}
              placeholder="Search activities..."
              size="default"
            />
          </div>

          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetAll}
                className="text-muted-foreground hover:text-foreground"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Clear Filters ({tableState.columnFilters.length})
              </Button>
            )}

            <FilterDrawer
              filters={tableState.columnFilters}
              onFiltersChange={setColumnFilters}
              title="Filter Activities"
              description="Filter your activities using the options below"
              triggerText="Filter"
            >
              <Filter setColumnFilters={setColumnFilters} resetAll={resetAll} />
            </FilterDrawer>
          </div>
        </div>
        <DataTable data={mockRecentTasks} columns={columns} pageSize={20} />
      </Card>
    </div>
  );
}
