"use client";
import React, { useState } from "react";
// @ts-expect-error: ignore
import Dojah from "react-dojah";
import FormButton from "./forms/FormButton";
import { useAppSelector } from "@/store/hook";
import moment from "moment";
import { useSnackbar } from "@/providers/SnackbarProvider";

interface IProps {
  text: string;
  user: any;
  className?: string;
  handleSuccess: (data: any) => void;
}

function DojahVerification({ text, className, handleSuccess }: IProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showSnackbar } = useSnackbar();
  const { first_name, last_name, id, email, date_of_birth } = useAppSelector(
    (state) => state.user.user
  );

  const appID = process.env.NEXT_PUBLIC_DOJAH_APP_ID;
  const publicKey = process.env.NEXT_PUBLIC_DOJAH_PUBLIC_KEY;
  const widgetId = process.env.NEXT_PUBLIC_DOJAH_WIDGET_ID;
  const type = "custom";
  const config = {
    widget_id: widgetId,
  };

  const userData = {
    first_name,
    last_name,
    email,
    residence_country: "NG",
    dob: moment(date_of_birth, "DD-MM-YYYY").format("YYYY-MM-DD"),
  };

  const metadata = {
    user_id: id,
  };

  const handleButtonClick = () => {
    setIsVisible(true);
  };

  const response = (type: any, data: any) => {
    console.log(type, data);
    if (type === "success") {
      setIsLoading(false);
      handleSuccess(data);
    } else if (type === "error") {
      setIsLoading(false);
      showSnackbar("error", data?.message);
    } else if (type === "close") {
      setIsLoading(false);
    } else if (type === "begin") {
    } else if (type === "loading") {
      setIsLoading(true);
    }
  };

  return (
    <>
      <FormButton
        type="button"
        btnStyle={className}
        handleClick={handleButtonClick}
        loading={isLoading}
      >
        {text}
      </FormButton>
      {isVisible && (
        <Dojah
          response={response}
          appID={appID}
          publicKey={publicKey}
          type={type}
          config={config}
          userData={userData}
          metadata={metadata}
        />
      )}
    </>
  );
}

export default DojahVerification;
