import React from "react";
import { IInfo, IWallet } from "@/constant/icons";

interface WalletBalanceCardProps {
  balance: string;
  onWithdraw?: () => void;
}

const WalletBalanceCard: React.FC<WalletBalanceCardProps> = ({ balance }) => {
  return (
    <div className="p-5 bg-primary max-w-[268px] h-[157px] rounded-[14px] relative overflow-hidden mb-12">
      <IWallet />
      <div className="flex items-center gap-1 my-[14px]">
        <p className="text-xs font-normal text-white">Wallet Balance</p>
        <IInfo />
      </div>

      <p className="text-2xl font-semibold text-white mt-10">{balance}</p>

      {/* Background bubbles */}
      <div className="w-[154px] h-[154px] rounded-full bg-[rgba(19,181,234,0.20)] absolute -right-[15%] -bottom-[40%] z-[0]" />
      <div className="w-[154px] h-[154px] rounded-full bg-[rgba(19,181,234,0.20)] absolute left-[50%] -translate-x-[50%] -bottom-[56%] z-[0]" />
      <div className="w-[154px] h-[154px] rounded-full bg-[rgba(19,181,234,0.20)] absolute -left-[15%] -bottom-[75%] z-[0]" />
    </div>
  );
};

export default WalletBalanceCard;
