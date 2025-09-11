import React from "react";
import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface TablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  showRowsPerPage?: boolean;
  className?: string;
}

export function TablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 50, 100],
  showRowsPerPage = true,
  className,
}: TablePaginationProps<TData>) {
  const {
    pagination: { pageIndex, pageSize },
  } = table.getState();

  const currentPage = pageIndex + 1;
  const totalPages = table.getPageCount();
  const totalRows = table.getFilteredRowModel().rows.length;
  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min(currentPage * pageSize, totalRows);

  const generatePageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  //   if (totalPages <= 1) return null;

  return (
    <div
      className={cn(
        "flex flex-col gap-4 px-2 py-4",
        "sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      {/* Info and Page Size Selector */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        {showRowsPerPage && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium whitespace-nowrap">
              Rows per page
            </span>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
                table.setPageIndex(0); // Reset to first page
              }}
            >
              <SelectTrigger className="h-8 w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="text-sm text-muted-foreground">
          Showing {startRow.toLocaleString()}-{endRow.toLocaleString()} of{" "}
          {totalRows.toLocaleString()} entries
        </div>
      </div>

      {/* Pagination Controls */}
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                table.previousPage();
              }}
              className={cn(
                !table.getCanPreviousPage() && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>

          {generatePageNumbers().map((page, index) => (
            <PaginationItem key={index}>
              {page === "ellipsis" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    table.setPageIndex(page - 1);
                  }}
                  isActive={page === currentPage}
                  className="hidden sm:inline-flex"
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Mobile page indicator */}
          <PaginationItem className="sm:hidden">
            <span className="flex h-9 min-w-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm">
              {currentPage} of {totalPages}
            </span>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                table.nextPage();
              }}
              className={cn(
                !table.getCanNextPage() && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
