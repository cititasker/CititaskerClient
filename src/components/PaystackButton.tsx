"use client";
import React from "react";
import FormButton from "./forms/FormButton";
import Paystack from "@/utils/paystackSetup";
import Image from "next/image";
import { cn } from "@/utils";

interface IProps {
  handleSuccess: any;
  text: string;
  className: string;
  data: {
    email: string;
    amount: number;
  };
  metadata?: any;
}

const PaystackButton = ({
  text,
  className,
  handleSuccess,
  data,
  metadata,
}: IProps) => {
  const handleClick = () => {
    Paystack.startPayment({ ...data, metadata, handleSuccess });
  };
  return (
    <FormButton
      className={cn("font-medium shadow-md", className)}
      handleClick={handleClick}
    >
      <Image src="/images/paystack_logo.png" alt="" width={20} height={20} />
      {text}
    </FormButton>
  );
};

export default PaystackButton;
