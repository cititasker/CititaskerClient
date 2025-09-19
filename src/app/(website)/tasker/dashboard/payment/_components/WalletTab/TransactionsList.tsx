import React from "react";
import { TransactionCard } from "./TransactionCard";
import { WalletTransaction } from "./hooks/useWallet";
import { Wallet } from "lucide-react";

interface TransactionsListProps {
  transactions: WalletTransaction[];
  title?: string;
}

export const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
  title = "Recent Transactions",
}) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-white border border-neutral-200 rounded-2xl p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="font-semibold text-neutral-900 mb-2">{title}</h3>
          <p className="text-neutral-600 text-sm">
            No transactions found. Your transaction history will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-neutral-200">
        <h3 className="font-semibold text-neutral-900 text-lg">{title}</h3>
        <p className="text-neutral-600 text-sm mt-1">
          {transactions.length} transaction
          {transactions.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="divide-y divide-neutral-100">
        {transactions.map((transaction, index) => (
          <div key={transaction.reference || index} className="p-4">
            <TransactionCard transaction={transaction} />
          </div>
        ))}
      </div>
    </div>
  );
};
