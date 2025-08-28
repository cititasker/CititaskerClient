"use client";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { CustomTable } from "@/components/reusables/CustomTable";
import { useAppSelector } from "@/store/hook";
import { columns, RecentTask } from "./_components/column";
import { DoughnutChart } from "@/components/shared/doughnut-chart";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const selectOptions = [
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
  { value: "year", label: "This year" },
];

export default function Page() {
  const { user } = useAppSelector((state) => state.user);
  const [timeframe, setTimeframe] = useState("week");

  const data: RecentTask[] = [
    {
      sn: "#3066",
      poster: "Alice",
      location: "Idimu",
      date: "12-08-2025",
      status: "pending",
    },
  ];

  return (
    <Card className="relative p-5 sm:px-[42px] pt-[42px] pb-10">
      <div className="mb-10 flex gap-3 justify-between">
        <div>
          <h1 className="text-xl font-semibold text-black mb-1">
            Good evening {user.first_name ?? "Guest"},
          </h1>
          <p className="text-base font-normal text-dark-grey-2">
            Manage all your tasks here on your dashboard.
          </p>
        </div>
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
      </div>
      <div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-5 mb-10">
          <DashboardCard title="Completed Task" value={18} percentage={90.78} />

          <DashboardCard title="Pending Task" value={5} percentage={45.12} />

          <DashboardCard title="Overdue Task" value={2} percentage={12.34} />
        </div>
        <div className="flex gap-5 mb-10">
          <div className="max-w-[650px] w-full rounded-2xl border p-8">
            {/* <DoughnutChart /> */}
          </div>
          <DoughnutChart />
        </div>
        <CustomTable
          title="Recent Activity"
          columns={columns}
          data={data}
          headerClass="bg-primary text-white"
        />
      </div>
    </Card>
  );
}
