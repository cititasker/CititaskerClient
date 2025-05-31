import CustomTable from "@/components/reusables/CustomTable";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import PaymentStatus from "../../PaymentStatus";
import FormButton from "@/components/forms/FormButton";
import { MdOutlineAdd } from "react-icons/md";
import { useAppSelector } from "@/store/hook";
import WalletBalanceCard from "@/components/reusables/WalletCard";

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
      <div className="w-full flex justify-between mb-8">
        <div>
          <p className="text-xl font-medium text-black-2 mb-1">
            Good Evening {user.first_name},
          </p>
          <p className="text-dark-grey-2">
            Manage all your wallet transfer here on your dashboard.
          </p>
        </div>
        <div className="flex  gap-4">
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
      <WalletBalanceCard balance="₦59,040.00" />
      <CustomTable title="Wallet Transaction" rows={rows} columns={columns} />
    </Box>
  );
};

export default WalletTab;
