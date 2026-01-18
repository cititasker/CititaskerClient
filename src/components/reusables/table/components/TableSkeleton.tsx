import { TableCell, TableRow } from "@/components/ui/table";

interface TableSkeletonProps {
  columnCount: number;
  rowCount: number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  columnCount,
  rowCount,
}) => (
  <>
    {Array.from({ length: rowCount }).map((_, index) => (
      <TableRow key={`loading-${index}`}>
        {Array.from({ length: columnCount }).map((_, cellIndex) => (
          <TableCell key={`loading-cell-${cellIndex}`} className="px-4 py-3">
            <div className="bg-muted h-4 animate-pulse rounded" />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);
