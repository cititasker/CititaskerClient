import FormButton from "@/components/forms/FormButton";
import Icons from "@/components/Icons";
import CustomTable from "@/components/reusables/CustomTable";
import { Box, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { MdOutlineAdd } from "react-icons/md";
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
    <Box sx={style.container} className="px-8">
      <div className="p-5 bg-primary max-w-[268px] rounded-[14px] relative overflow-hidden mb-12">
        <div className="flex items-center gap-1 mb-[14px]">
          <Typography className="text-xs font-normal text-white">
            Wallet Balance
          </Typography>
          <Icons.info className="info" />
        </div>
        <Typography className="text-2xl font-semibold text-white">
          ₦59,040.00
        </Typography>
        <FormButton btnStyle="bg-red-light-1 min-h-[33px] rounded-[10px] py-0 mt-[30px] ml-auto relative z-[1]">
          <div className="text-white text-xs flex item-center">
            <MdOutlineAdd size={18} /> Withdraw
          </div>
        </FormButton>
        <div className="w-[154px] h-[154px] rounded-full bg-[rgba(19,181,234,0.20)] absolute -right-[15%] -bottom-[40%] z-[0]"></div>
        <div className="w-[154px] h-[154px] rounded-full bg-[rgba(19,181,234,0.20)] absolute left-[50%] -translate-x-[50%] -bottom-[56%] z-[0]"></div>
        <div className="w-[154px] h-[154px] rounded-full bg-[rgba(19,181,234,0.20)] absolute -left-[15%] -bottom-[75%] z-[0]"></div>
      </div>
      <CustomTable title="Transactions History" rows={rows} columns={columns} />
    </Box>
  );
};

export default PaymentTab;
