"use client";
import DashboardCard from "@/components/dashboard/DashboardCard";
import DoughnutChart from "@/components/dashboard/DoughnutChart";
import CustomTable from "@/components/reusables/CustomTable";
import { useAppSelector } from "@/store/hook";
import Typography from "@mui/material/Typography";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";

export default function Page() {
  const { user } = useAppSelector((state) => state.user);
  const columns: GridColDef[] = [
    { field: "s/n", headerName: "S/N", flex: 1 },
    { field: "poster", headerName: "Poster", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "status", headerName: "Task Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: () => <MdOutlineRemoveRedEye />,
    },
  ];
  const rows: any = [];
  return (
    <div className="px-[42px] pt-[42px] pb-10 paper">
      <div className="mb-10">
        <Typography className="text-xl font-semibold text-black mb-1">
          Good evening {user.first_name ?? "Guest"},
        </Typography>
        <Typography className="text-base font-normal text-dark-grey-2">
          Manage all your task here on your dashboard.
        </Typography>
      </div>
      <div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-5 mb-10">
          <DashboardCard />
          <DashboardCard />
          <DashboardCard />
        </div>
        <div className="flex w-full gap-5 mb-10">
          <div className="max-w-[650px] w-full rounded-30 border border-dark-grey p-[30px]"></div>
          <div className="max-w-[288px] w-full rounded-30 border border-dark-grey py-5 px-4">
            <DoughnutChart />
          </div>
        </div>
        <div>
          <CustomTable
            title="Recent Activity"
            rows={rows}
            columns={columns}
            checkboxSelection={false}
          />
        </div>
      </div>
    </div>
  );
}
