import { BadgeCheck, Banknote } from "lucide-react";
import React from "react";

import CurrencyInput from "@/components/forms/CurrencyInput";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils";
import ExtraInfo from "@/components/forms/ExtraInfo";

interface IProps {
  user: any;
  availableBalance: number;
  minWithdrawal: number;
}

export default function WithdrawalModal({
  user,
  availableBalance,
  minWithdrawal,
}: IProps) {
  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Available Balance
              </p>
              <p className="text-3xl font-bold text-primary">
                {formatCurrency({ value: availableBalance })}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Banknote className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Amount Input */}
      <div>
        <CurrencyInput
          name="amount"
          label="Withdrawal Amount"
          placeholder="Enter amount"
        />
        <p className="text-xs text-muted-foreground mt-1.5">
          Minimum withdrawal: {formatCurrency({ value: minWithdrawal })}
        </p>
      </div>

      <Separator />

      {/* Bank Details */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <BadgeCheck className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-base">Bank Account Details</h3>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-[120px_1fr] gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Bank Name:
            </span>
            <span className="text-sm font-semibold">
              {user.bank_details?.bank_name || "Not provided"}
            </span>
          </div>

          <Separator />

          <div className="grid grid-cols-[120px_1fr] gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Account Number:
            </span>
            <span className="text-sm font-semibold font-mono">
              {user.bank_details?.account_number || "Not provided"}
            </span>
          </div>

          <Separator />

          <div className="grid grid-cols-[120px_1fr] gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Account Name:
            </span>
            <span className="text-sm font-semibold">
              {user.bank_details?.account_name || "Not provided"}
            </span>
          </div>
        </div>

        {!user.bank_details && (
          <ExtraInfo>
            No bank account details found. Please add your bank details before
            making a withdrawal.
          </ExtraInfo>
        )}
      </div>
    </div>
  );
}
