"use client";
import React from "react";
// @ts-expect-error:ignore
import useIdentityPayKYC from "react-identity-kyc";
import FormButton from "./forms/FormButton";

interface IProps {
  handleSubmit: any;
  data: {
    user_ref: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  text?: string;
  className?: string;
}

const passKey = process.env.NEXT_PUBLIC_ID_PASS_KEY;
const appId = process.env.NEXT_PUBLIC_ID_PASS_APP_ID;

const KycVerication = ({
  handleSubmit,
  data,
  text = "Verify me",
  className,
}: IProps) => {
  const config = {
    ...data,
    merchant_key: passKey,
    is_test: true, //set this to through for a test
    config_id: appId, //optional
    callback: handleSubmit,
  };
  const verifyWithIdentity = useIdentityPayKYC(config);
  return (
    <FormButton
      type="button"
      handleClick={verifyWithIdentity}
      btnStyle={className}
    >
      {text}
    </FormButton>
  );
};

export default KycVerication;
