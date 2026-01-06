"use client";
import Image from "next/image";
import React from "react";
import FormButton from "../forms/FormButton";
import { ROUTES } from "@/constant";
import BrandLogo from "../reusables/BrandLogo";
import { BRAND_LOGO_WHITE } from "@/constant/images";

const BecomeBanner = () => {
  return (
    <div className="container-w lg:pt-[7rem] lg:pb-16">
      <div className="relative rounded-3xl bg-primary w-full">
        {/* Background blobs */}
        <div className="absolute z-[0] left-0 right-0 top-0 bottom-0 rounded-3xl overflow-hidden">
          <span className="rounded-full absolute w-[4rem] h-[4rem] bg-[#F2AF42] -top-[55px] -left-[55px] md:-top-[10px] md:-left-[15px]"></span>
          <span className="rounded-full absolute w-[56px] sm:w-[8.875rem] h-[56px] sm:h-[8.875rem] bg-[#FF7A03] left-[40%] top-[calc(100%-26px)] sm:top-[-80px] translate-x-[-50%]"></span>
          <span className="rounded-full absolute w-[200px] md:w-[30.125rem] h-[200px] md:h-[30.125rem] bg-[#13B5EA] -top-2 md:-top-[250px] -right-[100px] md:-right-[130px]"></span>
          <span className="rounded-full absolute w-[15.75rem] h-[15.75rem] bg-[#C9F07D] -bottom-[130px] right-[60%] hidden sm:block"></span>
        </div>

        {/* Content */}
        <div className="relative z-[1] px-5 py-[42px] md:p-12 flex flex-col h-full max-w-full lg:max-w-[44.375rem] w-full">
          {/* Logo */}
          <BrandLogo
            src={BRAND_LOGO_WHITE}
            width={160}
            height={40}
            className="mb-5"
          />

          <div className="max-w-[360px]">
            <h2 className="text-white font-bold text-[20px] md:text-[40px] mb-2 sm:mb-4 max-w-[350px]">
              Don't sweat it. Just post it.
            </h2>
            <p className="text-white text-[14px] sm:text-base font-normal mb-6 sm:mb-[3.75rem]">
              Your time is precious don’t sweat on your task big or small. Post
              it on CitiTasker today!
            </p>
          </div>

          {/* CTA Button */}
          <FormButton
            href={ROUTES.POST_TASK}
            text="Post a Task"
            className="mt-auto"
          />
        </div>

        {/* Illustration */}
        <Image
          src="/images/engineer.svg"
          alt="Illustration"
          width={590}
          height={543}
          className="object-cover absolute bottom-0 h-[120%] left-[70%] translate-x-[-50%] hidden lg:block"
        />
      </div>
    </div>
  );
};

export default BecomeBanner;
