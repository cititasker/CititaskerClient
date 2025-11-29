import { flexRender, type Table } from "@tanstack/react-table";
import {
  TableHead,
  TableHeader as UITableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

interface TableHeaderProps<TData> {
  table: Table<TData>;
}

export const TableHeader = <TData,>({ table }: TableHeaderProps<TData>) => {
  const getSortIcon = (sortDirection: false | "asc" | "desc") => {
    switch (sortDirection) {
      case "asc":
        return <ArrowUp className="h-4 w-4" />;
      case "desc":
        return <ArrowDown className="h-4 w-4" />;
      default:
        return <ArrowUpDown className="h-4 w-4" />;
    }
  };

  return (
    <UITableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className="bg-primary hover:bg-primary">
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              align="right"
              className="text-xs text-white px-4 py-5 font-medium tracking-[1px] uppercase last:flex last:items-center last:justify-end"
            >
              {header.isPlaceholder ? null : (
                <div
                  className={
                    header.column.getCanSort()
                      ? "flex cursor-pointer items-center select-none"
                      : "flex items-center"
                  }
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
