import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ColumnDef, flexRender, Table } from "@tanstack/react-table";
import { TableSkeleton } from "./TableSkeleton";
import { TableEmptyState } from "./TableEmptyState";

interface DataTableBodyProps<TData> {
  table: Table<TData>;
  columns: ColumnDef<TData, any>[];
  isLoading: boolean;
  pageSize: number;
  empty?: {
    title: string;
    desc?: string;
    icon?: any;
  };
  isSearch: boolean;
}

export const DataTableBody = <TData,>({
  table,
  columns,
  isLoading,
  pageSize,
  empty,
  isSearch,
}: DataTableBodyProps<TData>) => (
  <TableBody>
    {isLoading ? (
      <TableSkeleton columnCount={columns.length} rowCount={pageSize} />
    ) : table.getRowModel().rows.length > 0 ? (
      table.getRowModel().rows.map((row) => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() ? "selected" : undefined}
          className="hover:bg-muted/50"
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell
              key={cell.id}
              className="px-4 py-3 last:ml-auto last:flex last:items-center last:justify-end"
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))
    ) : (
      <TableEmptyState
        columnCount={columns.length}
        empty={empty}
        isSearch={isSearch}
      />
    )}
  </TableBody>
);
