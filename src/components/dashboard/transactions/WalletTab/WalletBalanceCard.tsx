import React from "react";
import {
  Wallet,
  Eye,
  EyeOff,
  TrendingUp,
  ArrowUpRight,
} from "@/components/icons/index";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils";

interface WalletBalanceCardProps {
  balance: number;
  showBalance?: boolean;
  onToggleVisibility?: () => void;
  className?: string;
  previousBalance?: string;
  percentageChange?: number;
  isBalancePending: boolean;
}

export const WalletBalanceCard: React.FC<WalletBalanceCardProps> = ({
  balance,
  showBalance = true,
  onToggleVisibility,
  className,
  // previousBalance,
  percentageChange = 12.5,
}) => {
  return (
    <div className={cn("relative group max-w-md w-full mb-8", className)}>
      {/* Main Card */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-500 group-hover:scale-[1.02]">
        {/* Header Section */}
        <div className="relative p-6 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary-50 rounded-2xl group-hover:bg-primary-100 transition-colors">
                <Wallet className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-neutral-900 font-semibold text-lg">
                  Wallet Balance
                </h3>
                <p className="text-neutral-500 text-sm">Available funds</p>
              </div>
            </div>

            {onToggleVisibility && (
              <Button
                onClick={onToggleVisibility}
                variant="ghost"
                size="sm"
                className="h-9 w-9 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700"
              >
                {showBalance ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Balance Section */}
        <div className="px-6 pb-6">
          <div className="mb-4">
            <p className="text-4xl sm:text-5xl font-bold text-neutral-900 tracking-normal">
              {showBalance ? balance : "••••••••"}
            </p>
          </div>

          {/* Growth Indicator */}
          {showBalance && percentageChange && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 px-3 py-1.5 bg-success-light rounded-full">
                <TrendingUp className="w-3.5 h-3.5 text-success" />
                <span className="text-success text-sm font-semibold">
                  +{percentageChange}%
                </span>
              </div>
              <span className="text-neutral-500 text-sm">from last month</span>
            </div>
          )}
        </div>

        {/* Bottom Action Bar */}
        <div className="border-t border-neutral-100 bg-neutral-50/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-neutral-600">
              Last updated: 2 mins ago
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 h-8 px-3 text-sm font-medium"
            >
              View Details
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Subtle background decoration */}
      <div className="absolute -z-10 inset-0 bg-gradient-to-br from-primary-100/50 via-transparent to-secondary-100/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

// Alternative Glassmorphism Version
export const WalletBalanceCardGlass: React.FC<WalletBalanceCardProps> = ({
  balance,
  showBalance = true,
  onToggleVisibility,
  className,
  percentageChange = 12.5,
  isBalancePending,
}) => {
  return (
    <div className={cn("relative group max-w-sm w-full mb-8", className)}>
      {/* Glassmorphism Card */}
      <div className="relative overflow-hidden rounded-3xl backdrop-blur-xl bg-white/70 border border-neutral-200 shadow-md transition-all duration-500">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-secondary-500/5 to-accent-purple/10" />

        {/* Content */}
        <div className="relative z-10 p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/30 backdrop-blur-sm rounded-2xl border border-white/20">
                <Wallet className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <h3 className="text-neutral-900 font-semibold text-lg">
                  Total Balance
                </h3>
                <p className="text-neutral-600 text-sm">Your available funds</p>
              </div>
            </div>

            {onToggleVisibility && (
              <Button
                onClick={onToggleVisibility}
                variant="ghost"
                size="sm"
                className="h-9 w-9 rounded-full hover:bg-white/20 text-neutral-600 hover:text-neutral-800 backdrop-blur-sm"
              >
                {showBalance ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>

          {/* Balance Display */}
          <div className="mb-4">
            <p className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight mb-2">
              {showBalance ? formatCurrency({ value: balance }) : "••••••••"}
            </p>

            {showBalance && percentageChange && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-3 py-1 bg-success/20 backdrop-blur-sm rounded-full border border-success/20">
                  <TrendingUp className="w-3 h-3 text-success-600" />
                  <span className="text-success-700 text-xs font-semibold">
                    +{percentageChange}%
                  </span>
                </div>
                <span className="text-neutral-600 text-sm">vs last month</span>
              </div>
            )}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-xl" />
        <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 rounded-full blur-xl" />
      </div>
    </div>
  );
};
