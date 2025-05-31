import React from "react";
import { Typography } from "@mui/material";
import Icons from "@/components/Icons";
import FormButton from "../forms/FormButton";
import { MdOutlineAdd } from "react-icons/md";

interface WalletBalanceCardProps {
  balance: string;
  onWithdraw?: () => void;
}

const WalletBalanceCard: React.FC<WalletBalanceCardProps> = ({ balance }) => {
  return (
    <div className="p-5 bg-primary w-[268px] h-[157px] rounded-[14px] relative overflow-hidden mb-12">
      <Icons.wallet />
      <div className="flex items-center gap-1 my-[14px]">
        <Typography className="text-xs font-normal text-white">
          Wallet Balance
        </Typography>
        <Icons.info className="info" />
      </div>

      <Typography className="text-2xl font-semibold text-white mt-10">
        {balance}
      </Typography>

      {/* Background bubbles */}
      <div className="w-[154px] h-[154px] rounded-full bg-[rgba(19,181,234,0.20)] absolute -right-[15%] -bottom-[40%] z-[0]" />
      <div className="w-[154px] h-[154px] rounded-full bg-[rgba(19,181,234,0.20)] absolute left-[50%] -translate-x-[50%] -bottom-[56%] z-[0]" />
      <div className="w-[154px] h-[154px] rounded-full bg-[rgba(19,181,234,0.20)] absolute -left-[15%] -bottom-[75%] z-[0]" />
    </div>
  );
};

export default WalletBalanceCard;
