import FormButton from "@/components/forms/FormButton";
import CustomTable from "@/components/reusables/CustomTable";
import { Box, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { MdOutlineAdd } from "react-icons/md";
import PaymentStatus from "../../PaymentStatus";
import { useAppSelector } from "@/store/hook";
import DashboardCreditCard from "@/components/reusables/DashboardCreditCard";

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
const WalletTab = () => {
  const { user } = useAppSelector((state) => state.user);

  const columns: GridColDef[] = [
    { field: "reference", headerName: "Reference", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "method", headerName: "Transaction Type", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params: any) => (
        <PaymentStatus status={params.value} name={params.value} />
      ),
    },
  ];
  const rows: any = [];

  return (
    <Box sx={style.container} className="px-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <Typography className="text-xl font-semibold text-black mb-1">
            Good evening {user.first_name ?? "Guest"},
          </Typography>
          <Typography className="text-base font-normal text-dark-grey-2">
            Manage all your wallet transfer here on your dashboard.
          </Typography>
        </div>
        <div className="flex items-center gap-4">
          <FormButton className="text-base">
            <div className="text-white gap-2 text-xs flex item-center">
              <MdOutlineAdd size={16} /> Top Up
            </div>
          </FormButton>
          <FormButton className="bg-red-light-1 text-base">
            <div className="text-white gap-2 text-xs flex item-center">
              <MdOutlineAdd size={16} /> Transfer
            </div>
          </FormButton>
        </div>
      </div>
      <DashboardCreditCard showWallet />
      <CustomTable title="Wallet Transaction" rows={rows} columns={columns} />
    </Box>
  );
};

export default WalletTab;
