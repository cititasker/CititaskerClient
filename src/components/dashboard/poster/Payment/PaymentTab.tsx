import CustomTable from "@/components/reusables/CustomTable";
import React from "react";
import PaymentStatus from "../../PaymentStatus";
import { GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const PaymentTab = () => {
  const columns: GridColDef[] = [
    { field: "reference", headerName: "Reference", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "method", headerName: "Method", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params: any) => (
        <PaymentStatus status={params.value} name={params.value} />
      ),
    },
    {
      field: "action",
      headerName: "",
      flex: 1,
      renderCell: () => <Button>View</Button>,
    },
  ];
  const rows: any = [
    {
      id: 1,
      reference: "542218754332295r",
      name: "Michael O.",
      email: "judith.cynthia@gmail.com",
      amount: "NGN 100,000",
      method: "Transfer",
      date: "Jan 22, 2024 11:36 am",
      status: "successful",
    },
    {
      id: 2,
      reference: "542218754332295r",
      name: "Michael O.",
      email: "judith.cynthia@gmail.com",
      amount: "NGN 100,000",
      method: "Transfer",
      date: "Jan 22, 2024 11:36 am",
      status: "on_hold",
    },
    {
      id: 3,
      reference: "542218754332295r",
      name: "Michael O.",
      email: "judith.cynthia@gmail.com",
      amount: "NGN 100,000",
      method: "Transfer",
      date: "Jan 22, 2024 11:36 am",
      status: "failed",
    },
  ];
  return <CustomTable title="Payment History" rows={rows} columns={columns} />;
};

export default PaymentTab;
