"use client";
import Icons from "@/components/Icons";
import { getBanks, resolveAccountNumber } from "@/services";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import PaymentStatus from "../PaymentStatus";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "@/components/forms/FormInput";
import ActionsButtons from "@/components/reusables/ActionButtons";
import FormAutoComplete from "@/components/forms/FormAutoComplete";
import { verifyBank } from "@/services/user";

const schema = z.object({
  bank: z.any().nullable(),
  account_number: z.string(),
  name: z.string().min(1, "Could not resolve account name"),
});

type schemaType = z.infer<typeof schema>;

interface IOption {
  id: number;
  name: string;
  bank_code: string;
}

const BankVerification = () => {
  const [bankList, setBankList] = useState<IOption[]>([]);

  const getBankQuery = useQuery({
    queryKey: ["bank"],
    queryFn: getBanks,
  });

  const verifyBankMutation = useMutation({
    mutationFn: verifyBank,
    onSuccess: (data) => {
      console.log(123, data);
    },
    onError: (error) => {
      console.log(123, error);
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

  const { handleSubmit, setValue, watch } = methods;

  const account = watch("account_number");
  const bank = watch("bank");

  const resolveAccountQuery = useQuery({
    queryKey: ["bank", bank, account],
    queryFn: () => resolveAccountNumber({ account, bank_code: bank.bank_code }),
    enabled: account.length >= 10 && !!bank,
  });

  const resolvedBankDetails = resolveAccountQuery.data;

  useEffect(() => {
    if (resolvedBankDetails) {
      setValue("name", resolvedBankDetails.account_name);
    } else {
      setValue("name", "");
    }
  }, [resolvedBankDetails, resolveAccountQuery.isError]);

  const onSubmit = (value: any) => {
    console.log(99, value);
    const payload = {
      account_number: value.account_number,
      bank_code: value.bank.bank_code,
    };
    verifyBankMutation.mutate(payload);
  };

  console.log(567, resolveAccountQuery.data);
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<Icons.dropdown />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="flex items-center gap-5">
          <Typography className="text-base text-black">
            Payment Method
          </Typography>
          <PaymentStatus status="on_hold" name="Action Needed" />
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <FormProvider {...methods}>
          <form
            className="w-full min-h-[300px] relative"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-[44px]">
              <Typography className="text-text-black text-2xl font-semibold mb-2.5">
                Choose payment method
              </Typography>
              <Typography className="text-black text-sm font-normal">
                Set your payment method before performing a task.
              </Typography>
            </div>
            <div className="flex gap-x-7 items-center w-full">
              <FormAutoComplete
                name="bank"
                placeholder="Select a bank"
                label="Bank"
                options={bankList}
                getOptionLabel={(option: IOption) => option?.name || ""}
                isOptionEqualToValue={(option, value) =>
                  option.bank_code === value.bank_code
                }
              />
              <FormInput name="account_number" label="Account number" />
            </div>
            <div className="flex gap-x-7 items-center w-full">
              <FormInput name="name" label="Account Name" disabled />
              <div className="flex-1" />
            </div>
            <ActionsButtons
              okText="Save"
              type="submit"
              loading={verifyBankMutation.isPending}
            />
          </form>
        </FormProvider>
      </AccordionDetails>
    </Accordion>
  );
};

export default BankVerification;
