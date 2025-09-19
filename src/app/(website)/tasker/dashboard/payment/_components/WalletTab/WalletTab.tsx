"use client";
import React, { useState } from "react";
import { useWallet } from "./hooks/useWallet";
import { WalletHeader } from "./WalletHeader";
import { WalletBalanceCardGlass } from "./WalletBalanceCard";
import { TransactionsList } from "./TransactionsList";

const WalletTab: React.FC = () => {
  const { user, transactions, balance, greeting } = useWallet();
  const [showBalance, setShowBalance] = useState(true);

  const handleTopUp = () => {
    // Implement top up logic
    console.log("Top up clicked");
  };

  const handleTransfer = () => {
    // Implement transfer logic
    console.log("Transfer clicked");
  };

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <WalletHeader
        greeting={greeting}
        userName={user.first_name || "User"}
        onTopUp={handleTopUp}
        onTransfer={handleTransfer}
      />

      {/* Balance Card */}
      <WalletBalanceCardGlass
        balance={balance}
        showBalance={showBalance}
        onToggleVisibility={toggleBalanceVisibility}
      />

      {/* Transactions */}
      <TransactionsList
        transactions={transactions}
        title="Wallet Transactions"
      />
    </div>
  );
};

export default WalletTab;
