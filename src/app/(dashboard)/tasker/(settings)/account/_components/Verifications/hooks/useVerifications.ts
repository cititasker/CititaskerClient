// hooks/useVerifications.ts
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

import { getBanks, verifyAccountNumber } from "@/services";
import { API_ROUTES } from "@/constant";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { useFeedbackModal } from "@/components/reusables/Modals/UniversalFeedbackModal/hooks/useFeedbackModal";
import useModal from "@/hooks/useModal";
import { useAppSelector } from "@/store/hook";
import { bankVerificationSchema, BankVerificationSchema } from "../schemas";
import { updateBankDetails } from "@/services/user/users.api";

interface BankOption {
  id: number;
  name: string;
  bank_code: string;
}

export const useVerifications = () => {
  const { user } = useAppSelector((state) => state.user);
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const { showSuccess, showError, FeedbackModal } = useFeedbackModal();

  const idVerification = useModal();
  const paymentVerification = useModal();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const [bankList, setBankList] = useState<BankOption[]>([]);

  // Auto-open modals based on URL params
  useEffect(() => {
    if (type === "id") idVerification.openModal();
    else if (type === "bank") paymentVerification.openModal();
  }, [type]);

  const methods = useForm<BankVerificationSchema>({
    resolver: zodResolver(bankVerificationSchema),
    defaultValues: { bank: undefined, account_number: "", name: "" },
  });

  const { setValue, watch, reset } = methods;
  const account = watch("account_number");
  const bank = watch("bank");

  const getBankQuery = useQuery({
    queryKey: [API_ROUTES.UTILITY.BANKS],
    queryFn: getBanks,
    enabled: paymentVerification.isOpen,
  });

  const resolveAccountQuery = useQuery({
    queryKey: [API_ROUTES.UTILITY.VERIFY_ACCOUNT_NUMBER, bank, account],
    enabled: account.length >= 10 && !!bank,
    queryFn: () =>
      verifyAccountNumber({
        account_number: account,
        bank_code: bank?.bank_code,
      }),
  });

  useEffect(() => {
    const bankData = getBankQuery.data || [];
    if (bankData.length) {
      setBankList(
        bankData.map((el: any) => ({
          id: el.id,
          name: el.name,
          bank_code: el.code,
        }))
      );
    }
  }, [getBankQuery.data]);

  useEffect(() => {
    const resolvedAccount = resolveAccountQuery.data?.data;
    setValue("name", resolvedAccount?.account_name || "");
  }, [resolveAccountQuery.data, setValue]);

  const bankVerificationMutation = useMutation({
    mutationFn: updateBankDetails,
    onSuccess: () => {
      showSuccess("Your bank account has been successfully verified!", {
        title: "Bank Verified!",
      });
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.GET_USER_DETAILS],
      });
      paymentVerification.closeModal();
      reset();
    },
    onError: (error: any) => {
      showError(
        error?.message || "Failed to verify bank account. Please try again.",
        {
          title: "Verification Failed",
        }
      );
      paymentVerification.closeModal();
      reset();
    },
  });

  const onSubmitBankVerification = (values: BankVerificationSchema) => {
    const payload = {
      account_number: values.account_number,
      bank_code: values.bank.bank_code,
      bank_name: values.bank.name,
    };
    bankVerificationMutation.mutate(payload);
  };

  const handleIdVerificationSuccess = (res: any) => {
    showSnackbar(res.message, "success");
    showSuccess("Your identity has been successfully verified!", {
      title: "Identity Verified!",
    });
    setTimeout(() => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.GET_USER_DETAILS],
      });
    }, 5000);
  };

  const isIdentityVerified = Boolean(
    user.kyc_stage?.id_verification &&
      user.kyc_stage?.face_verification &&
      user.kyc_stage?.home_address
  );

  const isBankVerified = Boolean(user.kyc_stage?.bank);

  return {
    user,
    methods,
    name: methods.watch("name"),
    idVerification,
    paymentVerification,
    FeedbackModal,
    bankList,
    isSubmitting:
      bankVerificationMutation.isPending || resolveAccountQuery.isLoading,
    onSubmitBankVerification,
    handleIdVerificationSuccess,
    isIdentityVerified,
    isBankVerified,
  };
};
