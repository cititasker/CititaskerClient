import { TableCell, TableRow } from "@/components/ui/table";
import { Rows } from "lucide-react";

interface TableEmptyStateProps {
  columnCount: number;
  empty?: {
    title: string;
    desc?: string;
    icon?: any;
  };
  isSearch: boolean;
}

export const TableEmptyState: React.FC<TableEmptyStateProps> = ({
  columnCount,
  empty,
  isSearch,
}) => (
  <TableRow>
    <TableCell colSpan={columnCount} className="h-24 !bg-white text-center">
      {empty && !isSearch ? (
        <div className="h-[574px] w-full">
          <div className="text-ecnter mx-auto mt-[10%] flex w-fit flex-col items-center justify-center">
            <div className="bg-background-default mb-5 flex h-16 w-16 items-center justify-center rounded-lg">
              {empty.icon ? (
                <empty.icon />
              ) : (
                <Rows className="w-12 h-12 text-muted-foreground mb-3" />
              )}
            </div>
            <div className="w-full max-w-[350px]">
              <p className="text-default mb-2 font-semibold">{empty.title}</p>
              <p className="text-neutral text-sm font-medium">{empty.desc}</p>
            </div>
          </div>
        </div>
      ) : (
        "No results found."
      )}
    </TableCell>
  </TableRow>
);
