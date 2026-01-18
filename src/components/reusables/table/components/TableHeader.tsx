import { flexRender, type Table } from "@tanstack/react-table";
import {
  TableHead,
  TableHeader as UITableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableHeaderProps<TData> {
  table: Table<TData>;
}

export const TableHeader = <TData,>({ table }: TableHeaderProps<TData>) => {
  const getSortIcon = (sortDirection: false | "asc" | "desc") => {
    switch (sortDirection) {
      case "asc":
        return <ArrowUp size={12} />;
      case "desc":
        return <ArrowDown size={12} />;
      default:
        return <ChevronsUpDown size={12} />;
    }
  };

  return (
    <UITableHeader>
      {table.getHeaderGroups().map((headerGroup, groupIndex) => (
        <TableRow
          key={headerGroup.id}
          className={cn(
            "bg-light-primary-1 hover:bg-light-primary-1",
            groupIndex === 0 && "rounded-t-lg"
          )}
        >
          {headerGroup.headers.map((header, headerIndex) => (
            <TableHead
              key={header.id}
              align="right"
              className={cn(
                "text-xs text-black-2 px-4 py-5 font-medium tracking-[1px] uppercase h-auto",
                headerIndex === 0 && "rounded-tl-lg", // left corner
                headerIndex === headerGroup.headers.length - 1 &&
                  "rounded-tr-lg text-right" // right corner
              )}
            >
              {header.isPlaceholder ? null : (
                <div
                  className={cn(
                    header.column.getCanSort()
                      ? "flex cursor-pointer items-center select-none"
                      : "flex items-center",
                    headerIndex === headerGroup.headers.length - 1 &&
                      "justify-end"
                  )}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getCanSort() && (
                    <span className="ml-1">
                      {getSortIcon(header.column.getIsSorted())}
                    </span>
                  )}
                </div>
              )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </UITableHeader>
  );
};
