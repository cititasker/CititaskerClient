import FormButton from "@/components/forms/FormButton";
import AppTooltip from "@/components/reusables/AppTooltip";
import StatusBadge from "@/components/reusables/StatusBadge";
import { truncate } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";

export interface RecentTask {
  id: number;
  sn: number;
  name: string;
  poster: string | undefined;
  location: string;
  date: string;
  status: TaskStatusT;
  role: TRole;
}

export const columns: ColumnDef<RecentTask>[] = [
  {
    id: "sn",
    accessorKey: "sn",
    header: "S/N",
  },
  {
    id: "name",
    accessorKey: "name",
    header: "Title",
    cell({ row }) {
      return (
        <AppTooltip
          side="top"
          tooltipStyle={{
            width: "250px",
            background: "#7C8698",
            color: "white",
          }}
          tooltipClassName="px-4 py-2.5"
          content={row.original.name}
        >
          <p>{truncate(row.original.name)}</p>
        </AppTooltip>
      );
    },
  },
  {
    id: "poster",
    accessorKey: "poster",
    header: "Poster",
    cell({ row }) {
      return <div>{row.original.poster}</div>;
    },
  },
  {
    id: "location",
    accessorKey: "location",
    header: "Location",
    cell({ row }) {
      return (
        <AppTooltip
          side="top"
          tooltipStyle={{
            width: "250px",
            background: "#7C8698",
            color: "white",
          }}
          tooltipClassName="px-3 py-2.5"
          content={row.original.location}
        >
          <p>{truncate(row.original.location, 20)}</p>
        </AppTooltip>
      );
    },
  },
  {
    id: "date",
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const { id, role } = row.original;
      return (
        <FormButton
          href={`/${role}/my-tasks/${id}`}
          size="lg"
          variant="ghost"
          className="hover:bg-transparent px-0"
        >
          View
        </FormButton>
      );
    },
  },
];
