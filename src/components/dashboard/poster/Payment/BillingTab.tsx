import CustomTable from "@/components/reusables/CustomTable";
import React from "react";
import PaymentStatus from "../../PaymentStatus";
import { GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const BillingTab = () => {
  const columns: GridColDef[] = [
    { field: "reference", headerName: "Reference", flex: 1 },
    { field: "tasker", headerName: "Tasker", flex: 1 },
    { field: "payment_method", headerName: "Payment Method", flex: 1 },
    { field: "fee", headerName: "Fee", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
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
  const rows: any = [];
  return <CustomTable title="Billing History" rows={rows} columns={columns} />;
};

export default BillingTab;
