import Typography from "@mui/material/Typography";
import React from "react";
import FormButton from "../forms/FormButton";
import Icons from "../Icons";
import { MdOutlineAdd } from "react-icons/md";

interface IProps {
  showWallet?: boolean;
}
const DashboardCreditCard = ({ showWallet = false }: IProps) => {
  return (
    <div className="p-5 bg-primary max-w-[268px] rounded-[14px] relative overflow-hidden mb-12">
      {showWallet && <Icons.wallet className="mb-2" />}
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
        <div className="text-white text-xs flex gap-2 item-center">
          <MdOutlineAdd size={16} /> Withdraw
        </div>
      </FormButton>
      <div className="w-[154px] h-[154px] rounded-full bg-[rgba(19,181,234,0.20)] absolute -right-[15%] -bottom-[40%] z-[0]"></div>
      <div className="w-[154px] h-[154px] rounded-full bg-[rgba(19,181,234,0.20)] absolute left-[50%] -translate-x-[50%] -bottom-[56%] z-[0]"></div>
      <div className="w-[154px] h-[154px] rounded-full bg-[rgba(19,181,234,0.20)] absolute -left-[15%] -bottom-[75%] z-[0]"></div>
    </div>
  );
};

export default DashboardCreditCard;
