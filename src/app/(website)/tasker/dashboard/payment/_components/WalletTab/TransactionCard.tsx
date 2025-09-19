import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CustomStatusBadge } from "./TransactionStatus";
import { WalletTransaction } from "./hooks/useWallet";

interface TransactionCardProps {
  transaction: WalletTransaction;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
}) => {
  const initials = transaction.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white border border-neutral-200 rounded-xl hover:border-neutral-300 hover:shadow-sm transition-all duration-200">
      <div className="flex items-center gap-3 sm:gap-4">
        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 bg-primary-100 flex-shrink-0">
          <AvatarFallback className="bg-primary-100 text-primary-700 font-semibold text-xs sm:text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="flex-1 min-w-0 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-1">
          <h4 className="font-semibold text-neutral-900 text-xs sm:text-sm truncate">
            {transaction.name}
          </h4>
          <p className="font-semibold text-neutral-900 text-xs sm:text-sm text-right">
            {transaction.amount}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
          <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1">
            <p className="text-neutral-600 text-xs truncate">
              {transaction.email}
            </p>
            <p className="text-neutral-500 text-xs truncate">
              {transaction.method} • {transaction.date}
            </p>
          </div>
          <div className="flex-shrink-0 mt-1 sm:mt-0">
            <CustomStatusBadge status={transaction.status} />
          </div>
        </div>
      </div>
    </div>
  );
};
