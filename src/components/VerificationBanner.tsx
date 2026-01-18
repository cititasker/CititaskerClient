"use client";
import React from "react";
import Icons from "./Icons";
import FormButton from "./forms/FormButton";

const VerificationBanner = () => {
  return (
    <div className="bg-light-primary-2 w-full h-[85px] px-5 flex justify-center items-center rounded-[10px] relative mb-[14px]">
      <div className="w-full max-w-[782px] flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Icons.info className="shrink-0" />
          <p className="text-sm sm:text-base text-black font-normal">
            Hi Judith, Please verify your account now to have full access on
            CitiTasker.
          </p>
        </div>
        <FormButton text="Continue" href="#" />
      </div>
    </div>
  );
};

export default VerificationBanner;
