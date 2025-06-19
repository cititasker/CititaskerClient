"use client";

import React from "react";
import { ColumnDef, RowData } from "@tanstack/react-table";
import SearchAndFilterBar from "./SearchAndFilterBar";
import DataTable from "./DataTable";

interface CustomTableProps<TData extends RowData> {
  title: string;
  columns: ColumnDef<TData, any>[];
  data: TData[];
  headerClass?: string;
}

export function CustomTable<TData extends RowData>({
  title,
  columns,
  data,
  headerClass,
}: CustomTableProps<TData>) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-[#101828]">{title}</h2>
        <SearchAndFilterBar />
      </div>
      <DataTable columns={columns} data={data} headerClass={headerClass} />
    </div>
  );
}
