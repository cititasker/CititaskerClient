"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Icons from "../Icons";
import { MdOutlineAdd } from "react-icons/md";
import { cn } from "@/lib/utils";

interface DashboardCreditCardProps {
  showWallet?: boolean;
  balance?: string;
  onWithdraw?: () => void;
  className?: string;
}

const DashboardCreditCard: React.FC<DashboardCreditCardProps> = ({
  showWallet = false,
  balance = "₦0.00",
  onWithdraw,
  className,
}) => {
  return (
    <div
      className={cn(
        "p-5 bg-primary max-w-[268px] rounded-[14px] relative overflow-hidden mb-12",
        className
      )}
    >
      {showWallet && <Icons.wallet className="mb-2" />}

      <div className="flex items-center gap-1 mb-[14px]">
        <p className="text-xs font-normal text-white">Wallet Balance</p>
        <Icons.info className="info" />
      </div>

      <h2 className="text-2xl font-semibold text-white">{balance}</h2>

      <Button
        variant="ghost"
        className="bg-red-light-1 min-h-[33px] rounded-[10px] py-0 mt-[30px] ml-auto relative z-[1] text-white text-xs flex gap-2 items-center"
        onClick={onWithdraw}
      >
        <MdOutlineAdd size={16} /> Withdraw
      </Button>

      {/* Background circles */}
      <div className="w-[154px] h-[154px] rounded-full bg-[rgba(19,181,234,0.20)] absolute -right-[15%] -bottom-[40%] z-[0]" />
      <div className="w-[154px] h-[154px] rounded-full bg-[rgba(19,181,234,0.20)] absolute left-[50%] -translate-x-[50%] -bottom-[56%] z-[0]" />
      <div className="w-[154px] h-[154px] rounded-full bg-[rgba(19,181,234,0.20)] absolute -left-[15%] -bottom-[75%] z-[0]" />
    </div>
  );
};

export default DashboardCreditCard;
