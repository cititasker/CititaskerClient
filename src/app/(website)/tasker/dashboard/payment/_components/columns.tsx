import StatusBadge from "@/components/reusables/StatusBadge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export interface IDataPayment {
  reference: string;
  name: string;
  email: string;
  amount: string;
  method: string;
  date: string;
  status: string;
}

export const paymentColumns: ColumnDef<IDataPayment>[] = [
  { accessorKey: "reference", header: "Reference" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "amount", header: "Amount" },
  { accessorKey: "method", header: "Method" },
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
        View
      </Button>
    ),
  },
];

// Billings
export interface IDataBilling {
  reference: string;
  name: string;
  email: string;
  amount: string;
  method: string;
  date: string;
  status: string;
}

export const billingColumns: ColumnDef<IDataPayment>[] = [
  { accessorKey: "reference", header: "Reference" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "amount", header: "Amount" },
  { accessorKey: "method", header: "Method" },
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
        View
      </Button>
    ),
  },
];

// Wallet
export interface IDataWallet {
  reference: string;
  name: string;
  email: string;
  amount: string;
  method: string;
  date: string;
  status: string;
}

export const walletColumns: ColumnDef<IDataWallet>[] = [
  { accessorKey: "reference", header: "Reference" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "amount", header: "Amount" },
  { accessorKey: "method", header: "Method" },
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
        View
      </Button>
    ),
  },
];
