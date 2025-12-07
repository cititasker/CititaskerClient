"use client";
import React, { useState } from "react";
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
import { useFeedbackModal } from "@/components/reusables/Modals/UniversalFeedbackModal/hooks/useFeedbackModal";

const AVAILABLE_BALANCE = 50000;
const MIN_WITHDRAWAL = 1000;

const withdrawalSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine(
      (val) => {
        const num = parseFloat(val.replace(/,/g, ""));
        return !isNaN(num) && num >= MIN_WITHDRAWAL;
      },
      {
        message: `Minimum withdrawal amount is ${formatCurrency({
          value: MIN_WITHDRAWAL,
        })}`,
      }
    )
    .refine(
      (val) => {
        const num = parseFloat(val.replace(/,/g, ""));
        return !isNaN(num) && num <= AVAILABLE_BALANCE;
      },
      { message: "Insufficient balance" }
    ),
});

type WithdrawalFormData = z.infer<typeof withdrawalSchema>;

const WalletTab: React.FC = () => {
  const withdrawalModal = useModal();
  const { showSuccess, showError, FeedbackModal } = useFeedbackModal();
  const {
    user,
    isTransactionPending,
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
  const [showBalance, setShowBalance] = useState(true);

  // mutation
  const withdrawalMutation = useBaseMutation(withdrawFund, {
    invalidateQueryKeys: [[]],
    disableSuccessToast: true,
    onSuccess: () => {
      withdrawalModal.closeModal();
      showSuccess("Withdrawal successful", { title: "Success" });
      reset();
    },
    onError: () => {
      showError("Withdrawal failed", { title: "Error" });
    },
  });

  // Withdrawal form methods
  const methods = useForm<WithdrawalFormData>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      amount: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const handleTopUp = () => {
    console.log("Top up clicked");
  };

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  const onSubmit = (data: WithdrawalFormData) => {
    withdrawalMutation.mutate({ amount: Number(data.amount) });
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
        onTransfer={withdrawalModal.openModal}
      />

      {/* Balance Card */}
      <WalletBalanceCardGlass
        balance={balance}
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
            title="Withdraw"
            isOpen={withdrawalModal.isOpen}
            onClose={withdrawalModal.closeModal}
            customFooter={
              <ActionsButtons
                handleCancel={withdrawalModal.closeModal}
                okText="Confirm Withdrawal"
                loading={isSubmitting || withdrawalMutation.isPending}
                disabled={isSubmitting || !user.bank_details}
                formId={FORM_ID}
              />
            }
          >
            <WithdrawalModal
              user={user}
              availableBalance={AVAILABLE_BALANCE}
              minWithdrawal={MIN_WITHDRAWAL}
            />
          </CustomModal>
        </form>
      </FormProvider>

      <FeedbackModal />
    </div>
  );
};

export default WalletTab;
