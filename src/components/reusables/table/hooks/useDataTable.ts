import { useState, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  type ColumnFiltersState,
  type PaginationState,
} from "@tanstack/react-table";

interface UseDataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  initialSorting?: SortingState;
  initialColumnVisibility?: VisibilityState;
  initialColumnFilters?: ColumnFiltersState;
  onRowSelectionChange?: (rowSelection: Record<string, boolean>) => void;
  onPaginationChange?: (pagination: PaginationState) => void;
  pageCount?: number;
  manualPagination?: boolean;
  enableRowSelection?: boolean;
  pageSize?: number;
  pageIndex?: number;
}

export const useDataTable = <TData>({
  columns,
  data,
  initialSorting = [],
  initialColumnVisibility = {},
  initialColumnFilters = [],
  onRowSelectionChange,
  onPaginationChange,
  pageCount,
  manualPagination = false,
  enableRowSelection = false,
  pageSize = 10,
  pageIndex = 0,
}: UseDataTableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialColumnVisibility
  );
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(initialColumnFilters);
  const [rowSelection, setRowSelection] = useState({});

  const pagination: PaginationState = {
    pageIndex,
    pageSize,
  };

  const handlePaginationChange = useCallback(
    (
      updater: PaginationState | ((old: PaginationState) => PaginationState)
    ) => {
      const currentPagination = { pageIndex, pageSize };

      const newPagination =
        typeof updater === "function" ? updater(currentPagination) : updater;

      if (onPaginationChange) {
        onPaginationChange(newPagination);
      }
    },
    [pageIndex, pageSize, onPaginationChange]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      rowSelection,
      pagination,
    },
    enableRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: (updater) => {
      setRowSelection(updater);
      if (onRowSelectionChange) {
        const newSelection =
          typeof updater === "function" ? updater(rowSelection) : updater;
        onRowSelectionChange(newSelection);
      }
    },
    onPaginationChange: handlePaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination,
    pageCount: pageCount ?? -1,
  });

  return { table, pagination, resetRowSelection: () => setRowSelection({}) };
};
