import StatusBadge from "@/components/reusables/StatusBadge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export interface ITransactionData {
  reference: number;
  amount: string;
  date: string;
  status: TransactionStatusT;
  type?: "withdraw" | "deposit";
}

export const paymentColumns: ColumnDef<ITransactionData>[] = [
  { accessorKey: "reference", header: "Reference" },
  { accessorKey: "amount", header: "Amount" },
  { accessorKey: "date", header: "Date" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} showDot />,
  },
];

export const walletColumns: ColumnDef<ITransactionData>[] = [
  { accessorKey: "reference", header: "Reference" },
  {
    accessorKey: "type",
    header: "Transaction Type",
    cell({ row }) {
      return <p className="capitalize">{row.original.type}</p>;
    },
  },
  { accessorKey: "amount", header: "Amount" },
  { accessorKey: "date", header: "Date" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} showDot />,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: () => (
      <Button size="lg" variant="ghost" className="hover:bg-transparent px-0">
        View
      </Button>
    ),
  },
];
