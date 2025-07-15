import React from "react";
import FormButton from "@/components/forms/FormButton";
import { MdOutlineAdd } from "react-icons/md";
import { useAppSelector } from "@/store/hook";
import WalletBalanceCard from "@/components/reusables/WalletCard";
import { IDataWallet, walletColumns } from "./columns";
import { CustomTable } from "@/components/reusables/CustomTable";

const WalletTab = () => {
  const { user } = useAppSelector((state) => state.user);

  const rows: IDataWallet[] = [
    {
      reference: "542218754332295r",
      name: "Michael O.",
      email: "judith.cynthia@gmail.com",
      amount: "NGN 100,000",
      method: "Transfer",
      date: "Jan 22, 2024 11:36 am",
      status: "successful",
    },
    {
      reference: "542218754332295r",
      name: "Michael O.",
      email: "judith.cynthia@gmail.com",
      amount: "NGN 100,000",
      method: "Transfer",
      date: "Jan 22, 2024 11:36 am",
      status: "on_hold",
    },
  ];
  return (
    <div>
      <div className="w-full flex justify-between mb-8">
        <div>
          <p className="text-xl font-medium text-black-2 mb-1">
            Good Evening {user.first_name},
          </p>
          <p className="text-dark-grey-2">
            Manage all your wallet transfer here on your dashboard.
          </p>
        </div>
        <div className="flex gap-4">
          <FormButton
            className="text-sm text-white bg-green-state-color hover:bg-green-state-color/90"
            icon={<MdOutlineAdd size={20} />}
          >
            Top Up
          </FormButton>
          <FormButton
            className="text-sm text-white"
            icon={<MdOutlineAdd size={20} />}
          >
            Transfer
          </FormButton>
        </div>
      </div>
      <WalletBalanceCard balance="₦59,040.00" />
      <CustomTable
        title="Wallet Transaction"
        data={rows}
        columns={walletColumns}
      />
    </div>
  );
};

export default WalletTab;
