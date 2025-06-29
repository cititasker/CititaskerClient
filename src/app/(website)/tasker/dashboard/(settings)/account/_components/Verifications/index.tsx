import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getBanks, verifyAccountNumber } from "@/services";
import StatusBadge from "@/components/reusables/StatusBadge";
import { updateBankDetails } from "@/services/auth";
import {
  bankVerificationSchema,
  BankVerificationSchema,
} from "../../_utils/schemas";
import { useAppSelector } from "@/store/hook";
import useModal from "@/hooks/useModal";
import { API_ROUTES } from "@/constant";
import Icons from "@/components/Icons";
import ExtraInfo from "@/components/forms/ExtraInfo";
import { useSnackbar } from "@/providers/SnackbarProvider";
import IDVerificationModal from "./IDVerificationModal";
import BankVerificationModal from "./BankVerification";
import VerificationResultModal from "./VerificationResultModal";
import { useSearchParams } from "next/navigation";

interface IOption {
  id: number;
  name: string;
  bank_code: string;
}

const Verifications = () => {
  const { user } = useAppSelector((state) => state.user);
  const idVerification = useModal();
  const paymentVerification = useModal();
  const isSuccessVerification = useModal();
  const [bankList, setBankList] = useState<IOption[]>([]);
  const [responseMsg, setResponseMsg] = useState<{
    success: boolean;
    msg: string;
  } | null>(null);
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  useEffect(() => {
    if (type === "id") {
      idVerification.openModal();
    } else if (type == "bank") {
      paymentVerification.openModal();
    }
  }, [type]);

  const getBankQuery = useQuery({
    queryKey: [API_ROUTES.UTILITY.BANKS],
    queryFn: getBanks,
    enabled: paymentVerification.isOpen,
  });

  const mutation = useMutation({
    mutationFn: updateBankDetails,
    onSuccess: () => {
      setResponseMsg({
        success: true,
        msg: "You bank account has been verified",
      });
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.GET_USER_DETAILS],
      });
    },
    onError: (error) => {
      setResponseMsg({ success: false, msg: error?.message });
    },
    onSettled: () => {
      isSuccessVerification.openModal();
      paymentVerification.closeModal();
      reset();
    },
  });

  const bankData: IBank[] = getBankQuery.data || [];

  useEffect(() => {
    if (bankData.length) {
      setBankList(
        bankData.map((el) => ({ id: el.id, name: el.name, bank_code: el.code }))
      );
    }
  }, [bankData]);

  const methods = useForm<BankVerificationSchema>({
    resolver: zodResolver(bankVerificationSchema),
    defaultValues: { bank: undefined, account_number: "", name: "" },
  });

  const { setValue, watch, reset } = methods;

  const account = watch("account_number");
  const bank = watch("bank");
  const name = watch("name");

  const resolveAccountQuery = useQuery({
    queryKey: [API_ROUTES.UTILITY.VERIFY_ACCOUNT_NUMBER, bank, account],
    enabled: account.length >= 10 && !!bank,
    queryFn: () =>
      verifyAccountNumber({
        account_number: account,
        bank_code: bank?.bank_code,
      }),
  });
  const resolvedAccount = resolveAccountQuery.data?.data;

  useEffect(() => {
    if (resolvedAccount) {
      setValue("name", resolvedAccount.account_name);
    } else {
      setValue("name", "");
    }
  }, [resolvedAccount]);

  const handleSuccess = (res: any) => {
    showSnackbar(res.message, "success");
    queryClient.invalidateQueries({
      queryKey: [API_ROUTES.GET_USER_DETAILS],
    });
  };

  const onSubmit = (value: BankVerificationSchema) => {
    const payload = {
      account_number: value.account_number,
      bank_code: value.bank.bank_code,
      bank_name: value.bank.name,
    };
    mutation.mutate(payload);
  };

  return (
    <div className="relative pt-7">
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-1">Verify Account</h3>
        <p className="text-cs-dark-4">
          Please take a few minutes to complete the following:
        </p>
      </div>

      <div className="mb-[70px]">
        <div
          onClick={idVerification.openModal}
          className="mb-3 cursor-pointer h-[60px] flex items-center gap-[14px] py-3 px-[14px] max-w-[400px] w-full rounded-md bg-F9F9F9"
        >
          <Icons.profileTick />
          <span className="font-semibold">Identity verification</span>
          <StatusBadge
            status={user.kyc_stage?.id_verification ? "verified" : "unverified"}
            showDot
          />
        </div>
        <div
          onClick={paymentVerification.openModal}
          className="cursor-pointer h-[60px] flex items-center gap-[14px] py-3 px-[14px] max-w-[400px] w-full rounded-md bg-F9F9F9"
        >
          <Icons.cardPos />
          <span className="font-semibold">Payment method verification</span>
          <StatusBadge
            status={user.kyc_stage?.bank ? "verified" : "unverified"}
            showDot
          />
        </div>
      </div>
      <ExtraInfo className="w-fit">
        Please ensure that your legal name and date of birth are used to avoid
        having to re-verify.
      </ExtraInfo>
      <p className="text-sm mt-3 text-cs-dark-5">
        Any information captured in this process is used for security purposes
        only. Learn more about CitiTasker{" "}
        <span className="text-secondary">Data Privacy Policy.</span>
      </p>
      <IDVerificationModal
        isOpen={idVerification.isOpen}
        onClose={idVerification.closeModal}
        user={user}
        handleSuccess={handleSuccess}
      />

      <BankVerificationModal
        isOpen={paymentVerification.isOpen}
        onClose={paymentVerification.closeModal}
        methods={methods}
        onSubmit={onSubmit}
        bankList={bankList}
        name={name}
        isSubmitting={mutation.isPending}
      />
      <VerificationResultModal
        isOpen={isSuccessVerification.isOpen}
        onClose={isSuccessVerification.closeModal}
        success={!!responseMsg?.success}
        message={responseMsg?.msg || ""}
      />
    </div>
  );
};

export default Verifications;
