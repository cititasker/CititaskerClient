import StatusBadge from "@/components/reusables/StatusBadge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export interface RecentTask {
  sn: string;
  poster: string;
  location: string;
  date: string;
  status: string;
}

export const columns: ColumnDef<RecentTask>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: "sn", header: "S/N" },
  { accessorKey: "poster", header: "Poster" },
  { accessorKey: "location", header: "Location" },
  { accessorKey: "date", header: "Date" },
  {
    accessorKey: "status",
    header: "Task Status",
    cell: () => <StatusBadge status="cancelled" showDot />,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: () => (
      <Button size="lg" variant="ghost" className="hover:bg-transparent px-0">
        View Task
      </Button>
    ),
  },
];
