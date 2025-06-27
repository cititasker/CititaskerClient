"use client";
import Image from "next/image";
import React from "react";
import FormButton from "./forms/FormButton";
import { ROUTES } from "@/constant";

const BecomeTaskerBanner = () => {
  return (
    <div className="container pt-[2.5rem] md:pt-[5.625rem] pb-10 md:pb-16 bg-white">
      <div className="relative rounded-30 sm:rounded-[3.125rem] bg-primary w-full">
        <div className="absolute z-[0] left-0  right-0 top-0 bottom-0 rounded-30 sm:rounded-[3.125rem] overflow-hidden">
          <span className="rounded-full absolute w-[6.875rem] h-[6.875rem] bg-[#FF7A03] -top-[55px] -left-[55px] md:-top-[30px] md:-left-[30px]"></span>
          <span className="rounded-full absolute w-[56px] sm:w-[8.875rem] h-[56px] sm:h-[8.875rem] bg-[#C9F07D] left-[50%] top-[calc(100%-26px)] sm:top-[-80px] translate-x-[-50%]"></span>
          <span className="rounded-full absolute w-[200px] md:w-[30.125rem] h-[200px] md:h-[30.125rem] bg-[#fb9596] -top-2 md:-top-[200px] -right-[100px] md:-right-[130px]"></span>
          <span className="rounded-full absolute w-[3.125rem] h-[3.125rem] bg-[#038EFF] -bottom-[35px] left-[20%] hidden sm:block"></span>
          <span className="rounded-full absolute w-[18.75rem] h-[18.75rem] bg-[#F2AF42] -bottom-[130px] right-[25%] hidden sm:block"></span>
        </div>
        <div className="relative z-[1] px-5 py-[42px] md:px-12 lg:px-24 md:py-[4.875rem] flex flex-col h-full max-w-full lg:max-w-[44.375rem] w-full">
          <div className="mb-6 sm:mb-[3.75rem]">
            <h2 className="text-white font-bold text-[18px] sm:text-[2.5rem] mb-2 sm:mb-5">
              Become a Tasker for free
            </h2>
            <p className="text-white text-[14px] sm:text-base font-normal">
              Turn your skills into income with CitiTasker! Join a trusted
              community where you can choose tasks that match your expertise,
              work on your terms, and earn up to ₦500,000 a month. Signing up is
              easy, secure, and completely free. Start earning today—your next
              opportunity is just a click away!
            </p>
          </div>
          <FormButton
            href={ROUTES.TASKER}
            text="Earn on CitiTasker"
            className="mt-auto text-xs !bg-white !text-primary"
          />
        </div>
        <Image
          src="/images/tasker_lady.svg"
          alt=""
          width={718}
          height={478}
          className="object-cover absolute bottom-0 h-[120%] left-[70%] translate-x-[-50%] hidden lg:block"
        />
      </div>
    </div>
  );
};

export default BecomeTaskerBanner;
