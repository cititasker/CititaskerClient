"use client";

import React, { forwardRef, useImperativeHandle, useMemo } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { Table } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TablePagination } from "./TablePagination";
import { DataTableBody } from "./DataTableBody";
import { Checkbox } from "@/components/ui/checkbox";
import { useDataTable } from "../hooks/useDataTable";
import { TableHeader } from "./TableHeader";

interface DataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  pageSize?: number;
  pageIndex?: number;
  className?: string;
  isLoading?: boolean;
  onRowSelectionChange?: (rowSelection: Record<string, boolean>) => void;
  initialSorting?: SortingState;
  initialColumnVisibility?: VisibilityState;
  initialColumnFilters?: ColumnFiltersState;
  totalCount?: number;
  pageCount?: number;
  manualPagination?: boolean;
  onPaginationChange?: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;
  empty?: {
    title: string;
    desc?: string;
    icon?: any;
  };
  isSearch?: boolean;
  showPagination?: boolean;
  showTableCount?: boolean;
  enableRowSelection?: boolean;
}

export interface DataTableRef {
  resetSelection: () => void;
}

export const DataTable = forwardRef<DataTableRef, DataTableProps<any, any>>(
  function DataTableComponent<TData, TValue>(
    {
      data,
      columns,
      pageSize = 10,
      pageIndex = 0,
      className,
      isLoading = false,
      onRowSelectionChange,
      initialSorting = [],
      initialColumnVisibility = {},
      initialColumnFilters = [],
      totalCount,
      pageCount,
      manualPagination = false,
      onPaginationChange,
      empty,
      isSearch = false,
      showPagination = true,
      showTableCount = true,
      enableRowSelection = false,
    }: DataTableProps<TData, TValue>,
    ref: React.Ref<DataTableRef>
  ) {
    const tableColumns = useMemo(() => {
      if (!enableRowSelection) return columns;

      // Check if select column already exists
      const hasSelectColumn = columns.some(
        (col) => "id" in col && col.id === "select"
      );

      if (hasSelectColumn) return columns;

      const selectColumn: ColumnDef<TData, TValue> = {
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            checked={table.getIsAllPageRowsSelected()}
            indeterminate={table.getIsSomePageRowsSelected()}
            onChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            checked={row.getIsSelected()}
            indeterminate={false}
            onChange={(value) => row.toggleSelected(!!value)}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      };

      return [selectColumn, ...columns];
    }, [columns, enableRowSelection]);

    const { table, pagination, resetRowSelection } = useDataTable({
      columns: tableColumns,
      data,
      initialSorting,
      initialColumnVisibility,
      initialColumnFilters,
      onRowSelectionChange,
      onPaginationChange,
      pageCount,
      manualPagination,
      enableRowSelection,
      pageSize,
      pageIndex,
    });

    useImperativeHandle(
      ref,
      () => ({
        resetSelection: resetRowSelection,
      }),
      [resetRowSelection]
    );

    const hasData = data.length > 0;

    return (
      <div className={cn("space-y-4", className)}>
        <Card className="shadow-none rounded-none">
          <div className="min-h-0 w-full flex-shrink-0 overflow-x-auto">
            <div className="min-w-max">
              <Table>
                <TableHeader table={table} />
                <DataTableBody
                  table={table}
                  columns={tableColumns}
                  isLoading={isLoading}
                  pageSize={pagination.pageSize}
                  empty={empty}
                  isSearch={isSearch}
                />
              </Table>
            </div>
          </div>
        </Card>

        {hasData && showPagination && (
          <TablePagination
            table={table}
            totalCount={totalCount}
            isLoading={isLoading}
            showTableCount={showTableCount}
          />
        )}
      </div>
    );
  }
);

export function IndeterminateCheckbox({
  checked,
  indeterminate,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  indeterminate: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <Checkbox
      checked={indeterminate ? "indeterminate" : checked}
      onCheckedChange={(value) => {
        if (value === "indeterminate") return;
        onChange(value as boolean);
      }}
      disabled={disabled}
      aria-label="Select row"
    />
  );
}
