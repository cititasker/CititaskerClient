"use client";
import { Box, SxProps, Theme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Icons from "@/components/Icons";
import PaymentStatus from "../PaymentStatus";
import ExtraInfo from "@/components/forms/ExtraInfo";
import CustomModal from "@/components/reusables/CustomModal";
import useModal from "@/hooks/useModal";
import theme from "@/providers/theme";
import PadLock from "@/../public/images/padlock.png";
import Image from "next/image";
import { useAppSelector } from "@/store/hook";
import dynamic from "next/dynamic";
import FormAutoComplete from "@/components/forms/FormAutoComplete";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getBanks, verifyAccountNumber } from "@/services";
import FormInput from "@/components/forms/FormInput";
import ActionsButtons from "@/components/reusables/ActionButtons";
import Failed from "@/../public/icons/big_close_circle.svg";
import Success from "@/../public/icons/big_tick_circle.svg";
import { updateBankDetails } from "@/services/auth";
import { API_ROUTES } from "@/constant";

const DojahVerification = dynamic(
  () => import("@/components/DojahVerification"),
  {
    ssr: false,
  }
);

const style: Record<string, SxProps<Theme>> = {
  container: {
    ".MuiAccordion-root": {
      boxShadow: "0px 13px 13px 0px rgba(0, 0, 0, 0.05)",
      border: "1px solid var(--F5F5F5)",
      borderRadius: "20px !important",
      mb: "20px",
      overflow: "hidden",
      bgcolor: "white",

      "&:last-of-type": {
        mb: 0,
      },

      "&:before": {
        display: "none",
      },

      ".MuiAccordion-heading": {
        border: "none",
      },

      ".MuiAccordionSummary-root": {
        height: "80px",
        px: "40px",
        ".MuiAccordionSummary-content": {
          my: 0,
        },
      },
      ".MuiAccordionDetails-root": {
        px: "40px",
      },
      ".Mui-expanded": {
        minHeight: "auto",
      },
      "&.Mui-expanded": {
        minHeight: "auto",
      },
    },
  },
};

const data = [
  "BVN",
  "Government ID such as NIN Slip, Voter’s Card, International Passport, or Driver’s License.",
  "Access to a functioning camera for face validation.",
  "Proof of Address e.g. Utility Bill, Bank Statement or Rent Agreement",
];

const schema = z.object({
  bank: z
    .any()
    .nullable()
    .refine((val) => !!val, {
      message: "Please select a bank",
    }),
  account_number: z.string().min(10, "Please enter a valid account number"),
  name: z.string().min(1, "Could not resolve account name"),
});

type schemaType = z.infer<typeof schema>;
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

  const getBankQuery = useQuery({
    queryKey: [API_ROUTES.UTILITY.BANKS],
    queryFn: getBanks,
    enabled: paymentVerification.isOpen,
  });

  const updateBankMutation = useMutation({
    mutationFn: updateBankDetails,
    onSuccess: (data) => {
      console.log(123, data);
      setResponseMsg({ success: true, msg: data?.message });
    },
    onError: (error) => {
      console.log(123, error);
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

  const methods = useForm<schemaType>({
    defaultValues: {
      bank: null,
      account_number: "",
      name: "",
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, setValue, watch, reset } = methods;

  const account = watch("account_number");
  const bank = watch("bank");
  const name = watch("name");

  const resolveAccountQuery = useQuery({
    queryKey: [API_ROUTES.UTILITY.VERIFY_ACCOUNT_NUMBER, bank, account],
    enabled: account.length >= 10 && !!bank,
    queryFn: () =>
      verifyAccountNumber({
        account_number: account,
        bank_code: bank.bank_code,
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
    console.log(456, res);
  };

  const onSubmit = (value: any) => {
    console.log(99, value);
    const payload = {
      account_number: value.account_number,
      bank_code: value.bank.bank_code,
      bank_name: value.bank.name,
    };
    updateBankMutation.mutate(payload);
  };

  return (
    <Box sx={style.container} className="relative px-12 pt-7">
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
          <PaymentStatus status="on_hold" name="unverified" />
        </div>
        <div
          onClick={paymentVerification.openModal}
          className="cursor-pointer h-[60px] flex items-center gap-[14px] py-3 px-[14px] max-w-[400px] w-full rounded-md bg-F9F9F9"
        >
          <Icons.cardPos />
          <span className="font-semibold">Payment method verification</span>
          <PaymentStatus status="on_hold" name="unverified" />
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

      <CustomModal
        isOpen={idVerification.isOpen}
        onClose={idVerification.closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        paperStyle={{
          maxWidth: "496px",
          p: "20px",
          [theme.breakpoints.up("sm")]: {
            px: "46px",
            py: "48px",
            borderRadius: "24px",
          },
          [theme.breakpoints.up("md")]: {
            minHeight: "496px",
          },
        }}
        showCloseBtn={false}
      >
        <div className="mb-9">
          <h3 className="text-xl font-semibold mb-3">Verify Identity</h3>
          <p className="max-w-[360px] w-full text-sm">
            To complete the identity verification process. You’ll need the
            following for the identity verification:
          </p>
        </div>
        <ul className="list-outside list-disc pl-5">
          {data.map((el, i) => (
            <li key={i} className="mb-3 last:mb-0">
              {el}
            </li>
          ))}
        </ul>
        <DojahVerification
          text="Verify Identity"
          user={user}
          className="font-normal w-full mt-[63px]"
          handleSuccess={handleSuccess}
        />
        <Image
          src={PadLock}
          alt=""
          width={245}
          height={245}
          className="absolute top-0 bottom-0 right-0 left-0 m-auto"
        />
      </CustomModal>

      <CustomModal
        isOpen={paymentVerification.isOpen}
        onClose={paymentVerification.closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        paperStyle={{
          maxWidth: "496px",
          p: "20px",
          [theme.breakpoints.up("sm")]: {
            px: "46px",
            py: "48px",
            borderRadius: "24px",
          },
        }}
        showCloseBtn={true}
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="relative">
            <div className="mb-9">
              <h3 className="text-xl font-semibold mb-3">
                Verify bank account
              </h3>
              <p className="max-w-[360px] w-full text-sm">
                Please provide your bank name and account number to complete
                your payment method verification.
              </p>
            </div>
            <div className="space-y-6 w-full">
              <FormAutoComplete
                name="bank"
                placeholder="Select a bank"
                label="Bank"
                options={bankList}
                getOptionLabel={(option: IOption) => option?.name || ""}
                isOptionEqualToValue={(option, value) =>
                  option.bank_code === value.bank_code
                }
                className="mb-0"
              />
              <FormInput name="account_number" label="Account number" />
              {name && (
                <p className="text-center text-base capitalize">{name}</p>
              )}

              <ActionsButtons
                okText="Verify bank account"
                type="submit"
                loading={updateBankMutation.isPending}
                className="pb-0"
                disabled={!name || updateBankMutation.isPending}
              />
            </div>
            <Image
              src={PadLock}
              alt=""
              width={245}
              height={245}
              className="absolute top-0 bottom-0 right-0 left-0 m-auto -z-10"
            />
          </form>
        </FormProvider>
      </CustomModal>

      <CustomModal
        isOpen={isSuccessVerification.isOpen}
        onClose={isSuccessVerification.closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        paperStyle={{
          maxWidth: "496px",
          p: "20px",
          [theme.breakpoints.up("sm")]: {
            px: "46px",
            py: "48px",
            borderRadius: "24px",
          },
        }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center">
          {responseMsg?.success ? (
            <Image src={Success} alt="success" />
          ) : (
            <Image src={Failed} alt="failed" />
          )}
          <div className="text-center mt-4">
            <h2 className="text-xl font-semibold mb-2">
              {responseMsg?.success ? "Congratulations!" : "Oops!"}
            </h2>
            <p className="">{responseMsg?.msg}</p>
          </div>
        </div>
      </CustomModal>
    </Box>
  );
};

export default Verifications;
