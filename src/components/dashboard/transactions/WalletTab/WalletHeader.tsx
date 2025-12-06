import React from "react";
import { ArrowUpRight } from "@/components/icons/index";
import FormButton from "@/components/forms/FormButton";

interface WalletHeaderProps {
  greeting: string;
  userName: string;
  role: TRole | undefined;
  onTopUp?: () => void;
  onTransfer: () => void;
}

export const WalletHeader: React.FC<WalletHeaderProps> = ({
  greeting,
  userName,
  role,
  // onTopUp,
  onTransfer,
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
    <div className="space-y-1">
      <h1 className="text-xl sm:text-2xl font-semibold text-neutral-900">
        {greeting} {userName}
      </h1>
      <p className="text-neutral-600 text-sm sm:text-base">
        Manage all your wallet transfers here on your dashboard.
      </p>
    </div>

    <div className="flex gap-3 sm:gap-4">
      {/* <FormButton
        onClick={onTopUp}
        className="flex-1 sm:flex-none btn-secondary text-sm font-medium h-11"
        icon={<ArrowDownLeft className="w-4 h-4" />}
      >
        Top Up
      </FormButton> */}
      {role == "tasker" && (
        <FormButton
          onClick={onTransfer}
          className="flex-1 sm:flex-none btn-primary text-sm font-medium h-11"
          icon={<ArrowUpRight className="w-4 h-4" />}
        >
          Transfer
        </FormButton>
      )}
    </div>
  </div>
);
