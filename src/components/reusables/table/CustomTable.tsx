"use client";

import React from "react";
import { ColumnDef, RowData } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

import SearchAndFilterBar from "./SearchAndFilterBar";
import { useTableState } from "./hooks/useTableState";
import { DataTable } from "./components/DataTable";

interface CustomTableProps<TData extends RowData> {
  // Core table props
  title: string;
  description?: string;
  data: TData[];
  columns: ColumnDef<TData>[];

  // Filter configuration
  searchPlaceholder?: string;

  // Actions
  onRefresh?: () => void;
  onCreate?: () => void;
  onExport?: (format: "csv" | "excel" | "pdf") => void;
  extraActions?: React.ReactNode[];

  // Row actions
  renderRowActions?: (row: TData) => React.ReactNode;
  rowClassName?: string | ((row: TData) => string);

  // Table configuration
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  enableSorting?: boolean;
  enableColumnVisibility?: boolean;
  enableRowSelection?: boolean;
  enablePagination?: boolean;

  // States
  isLoading?: boolean;
  error?: string | null;

  // Styling
  className?: string;
  headerClassName?: string;
  compact?: boolean;

  // Empty states
  emptyTitle?: string;
  emptyDescription?: string;
}

export function CustomTable<TData extends RowData>({
  title,
  description,
  data,
  columns,
  searchPlaceholder = "Search...",
  onRefresh,
  onCreate,
  onExport,
  extraActions = [],
  defaultPageSize = 10,
  isLoading = false,
  error = null,
  className,
  compact = false,
  emptyTitle,
}: CustomTableProps<TData>) {
  // Use our custom hook for URL-persistent state management
  const {
    tableState,
    setSearch,
    setColumnFilters,
    resetAll,
    hasActiveFilters,
  } = useTableState(defaultPageSize);

  // Prepare actions for SearchAndFilterBar
  const searchFilterActions = [
    ...(onRefresh
      ? [
          <Button key="refresh" variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="w-4 h-4 mr-1" />
            {compact ? "" : "Refresh"}
          </Button>,
        ]
      : []),
    ...(onCreate
      ? [
          <Button key="create" size="sm" onClick={onCreate}>
            <Plus className="w-4 h-4 mr-1" />
            {compact ? "" : "Add New"}
          </Button>,
        ]
      : []),
    ...extraActions,
  ];

  // Error state
  if (error) {
    return (
      <Card className={cn("border-destructive", className)}>
        <CardContent className="p-6 text-center">
          <div className="text-destructive mb-2">Error loading data</div>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          {onRefresh && (
            <Button variant="outline" onClick={onRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
      </div>

      {/* Search and Filter Bar */}
      <SearchAndFilterBar
        searchValue={tableState.search}
        onSearchChange={setSearch}
        searchPlaceholder={searchPlaceholder}
        filters={tableState.columnFilters}
        onFiltersChange={setColumnFilters}
        onReset={resetAll}
        hasActiveFilters={hasActiveFilters}
        onExport={onExport}
        extraActions={searchFilterActions}
        compact={compact}
      />

      {/* Data Table */}
      <DataTable
        data={data}
        columns={columns}
        isLoading={isLoading}
        emptyMessage={emptyTitle}
      />
    </div>
  );
}
