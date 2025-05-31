
import CustomTable from "@/components/reusables/CustomTable";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import PaymentStatus from "../../PaymentStatus";

const style = {
  container: {
    ".info": {
      width: "10px",
      height: "10px",
      path: {
        fill: "white",
      },
    },
  },
};
const BillingTab = () => {
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
  return (
    <Box sx={style.container} className="px-4">
      <CustomTable title="Billing History" rows={rows} columns={columns} />
    </Box>
  );
};

export default BillingTab;