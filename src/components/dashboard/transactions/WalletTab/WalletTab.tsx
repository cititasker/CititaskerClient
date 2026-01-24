"use client";
import React, { useState, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useWallet } from "../../hooks/useWallet";
import { WalletHeader } from "./WalletHeader";
import { WalletBalanceCardGlass } from "./WalletBalanceCard";
import { CustomTable } from "@/components/reusables/table/CustomTable";
import { walletColumns } from "@/components/dashboard/transactions/columns";
import CustomModal from "@/components/reusables/CustomModal";
import useModal from "@/hooks/useModal";
import WithdrawalModal from "./WithdrawalModal";
import ActionsButtons from "@/components/reusables/ActionButtons";
import { formatCurrency } from "@/utils";
import { useBaseMutation } from "@/hooks/useBaseMutation";
import { withdrawFund } from "@/services/dashboard/dashboard.api";
import { API_ROUTES } from "@/constant";
import Success from "@/components/reusables/Success";

const MIN_WITHDRAWAL = 1000;
const BALANCE_VISIBILITY_KEY = "wallet_show_balance";

const WalletTab: React.FC = () => {
  const withdrawalModal = useModal();
  const {
    user,
    isTransactionPending,
    isBalancePending,
    balance,
    greeting,
    tableData,
    totalPages,
    totalDocuments,
    pagination,
    onPaginationChange,
    searchTerm,
    handleSearch,
    hasActiveFilters,
    resetAll,
    handleFilters,
  } = useWallet();

  const [isSuccess, setIsSuccess] = useState(false);
  const [showBalance, setShowBalance] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem(BALANCE_VISIBILITY_KEY);
    return stored ? JSON.parse(stored) : true;
  });

  // Create withdrawal schema with dynamic balance validation
  const withdrawalSchema = useMemo(
    () =>
      z.object({
        amount: z
          .string()
          .min(1, "Amount is required")
          .refine(
            (val) => {
              const cleaned = val.replace(/,/g, "");
              const num = parseFloat(cleaned);
              return !isNaN(num) && num > 0;
            },
            { message: "Please enter a valid amount" },
          )
          .refine(
            (val) => {
              const cleaned = val.replace(/,/g, "");
              const num = parseFloat(cleaned);
              return num >= MIN_WITHDRAWAL;
            },
            {
              message: `Minimum withdrawal amount is ${formatCurrency({
                value: MIN_WITHDRAWAL,
              })}`,
            },
          )
          .refine(
            (val) => {
              const cleaned = val.replace(/,/g, "");
              const num = parseFloat(cleaned);
              return num <= balance;
            },
            {
              message: `Insufficient balance. Available: ${formatCurrency({
                value: balance,
              })}`,
            },
          ),
      }),
    [balance],
  );

  type WithdrawalFormData = z.infer<typeof withdrawalSchema>;

  // Withdrawal form methods
  const methods = useForm<WithdrawalFormData>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      amount: "",
    },
    mode: "onChange", // Enable real-time validation
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  // Mutation
  const withdrawalMutation = useBaseMutation(withdrawFund, {
    invalidateQueryKeys: [
      [API_ROUTES.WALLET_BALANCE],
      [API_ROUTES.TRANSACTION_HISTORY],
    ],
    disableSuccessToast: true,
    onSuccess: () => {
      setIsSuccess(true);
      reset();
    },
  });

  const handleTopUp = () => {
    console.log("Top up clicked");
  };

  const toggleBalanceVisibility = () => {
    setShowBalance((prev) => {
      const next = !prev;
      localStorage.setItem(BALANCE_VISIBILITY_KEY, JSON.stringify(next));
      return next;
    });
  };

  const handleWithdrawalModalOpen = () => {
    setIsSuccess(false);
    reset();
    withdrawalModal.openModal();
  };

  const handleModalClose = () => {
    withdrawalModal.closeModal();
    setIsSuccess(false);
    reset();
  };

  const onSubmit = (data: WithdrawalFormData) => {
    const amount = parseFloat(data.amount.replace(/,/g, ""));

    // Additional runtime validation
    if (amount < MIN_WITHDRAWAL) {
      methods.setError("amount", {
        message: `Minimum withdrawal amount is ${formatCurrency({
          value: MIN_WITHDRAWAL,
        })}`,
      });
      return;
    }

    if (amount > balance) {
      methods.setError("amount", {
        message: `Insufficient balance. Available: ${formatCurrency({
          value: balance,
        })}`,
      });
      return;
    }

    withdrawalMutation.mutate({ amount });
  };

  const FORM_ID = "withdrawal-form";

  return (
    <div className="space-y-8">
      {/* Header */}
      <WalletHeader
        greeting={greeting}
        role={user?.role}
        userName={user.first_name || "User"}
        onTopUp={handleTopUp}
        onTransfer={handleWithdrawalModalOpen}
      />

      {/* Balance Card */}
      <WalletBalanceCardGlass
        balance={balance}
        isBalancePending={isBalancePending}
        showBalance={showBalance}
        onToggleVisibility={toggleBalanceVisibility}
      />

      <CustomTable
        title="Wallet Transaction"
        columns={walletColumns}
        data={tableData}
        isLoading={isTransactionPending}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        totalPages={totalPages}
        totalDocuments={totalDocuments}
        onPaginationChange={onPaginationChange}
        hasActiveFilters={hasActiveFilters}
        pagination={pagination}
        onReset={resetAll}
        onFiltersChange={handleFilters}
      />

      <FormProvider {...methods}>
        <form id={FORM_ID} onSubmit={handleSubmit(onSubmit)}>
          <CustomModal
            title={!isSuccess ? "Withdraw" : undefined}
            isOpen={withdrawalModal.isOpen}
            onClose={handleModalClose}
            customFooter={
              !isSuccess && (
                <ActionsButtons
                  handleCancel={handleModalClose}
                  okText="Confirm Withdrawal"
                  loading={isSubmitting || withdrawalMutation.isPending}
                  disabled={isSubmitting || !user.bank_details}
                  formId={FORM_ID}
                />
              )
            }
            contentClassName={`${isSuccess && "max-w-md"}`}
          >
            {isSuccess ? (
              <Success
                title="Withdrawal Successful 🎉"
                desc="Your withdrawal is being processed, you will be notified once it has been completed"
              />
            ) : (
              <WithdrawalModal
                user={user}
                availableBalance={balance}
                minWithdrawal={MIN_WITHDRAWAL}
              />
            )}
          </CustomModal>
        </form>
      </FormProvider>
    </div>
  );
};

export default WalletTab;
