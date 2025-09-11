"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Empty from "@/components/myTasks/Empty";
import { TablePagination } from "./TablePagination";

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  pageSize?: number;
  className?: string;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function DataTable<TData>({
  data,
  columns,
  pageSize = 10,
  className,
  isLoading = false,
  emptyMessage = "No data found",
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: { pageSize },
    },
  });

  const getSortIcon = (column: any) => {
    if (!column.getCanSort())
      return <ArrowUpDown className="w-4 h-4 opacity-50" />;
    const sorted = column.getIsSorted();
    if (sorted === "asc") return <ArrowUp className="w-4 h-4" />;
    if (sorted === "desc") return <ArrowDown className="w-4 h-4" />;
    return <ArrowUpDown className="w-4 h-4 opacity-50" />;
  };

  if (isLoading) {
    return (
      <Card className={cn("p-8 text-center", className)}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </Card>
    );
  }

  if (!data.length) {
    return (
      <Card className={cn("p-8", className)}>
        <Empty text={emptyMessage} size="sm" />
      </Card>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "font-semibold",
                        header.column.getCanSort() &&
                          "cursor-pointer select-none hover:bg-muted/50"
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center space-x-2">
                          <span>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </span>
                          {getSortIcon(header.column)}
                        </div>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <Empty text="No results found" size="sm" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <TablePagination table={table} />
    </div>
  );
}
