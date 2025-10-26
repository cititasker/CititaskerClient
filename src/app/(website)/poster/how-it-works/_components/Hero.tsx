"use client";
import React from "react";
import FormButton from "@/components/forms/FormButton";
import Chef from "@/assets/images/chef.png";
import BgShape from "@/../public/images/shape_bg/bg_shape_4.png";
import Image from "next/image";
import { ROUTES } from "@/constant";

const Hero = () => {
  return (
    <div className="bg-dark-secondary">
      <div className="container-w overflow-hidden relative pt-[8rem] md:pt-[12.5rem] pb-[5.25rem] flex flex-col md:flex-row items-center gap-y-12 gap-x-5 justify-between">
        <div className="max-w-[34.875rem] w-full flex flex-col items-center md:items-start">
          <div className="text-white mb-9 md:mb-[3.75rem] text-center md:text-left">
            <h2 className="text-[2.375rem] sm:text-[3rem] lg:text-[4rem] font-bold leading-normal">
              Post a task.
              <br /> Assign a Tasker.
              <br /> Get it done.
            </h2>
            <p className="mt-5 text-base sm:text-xl font-normal">
              Turn your to-dos into ta-da moments
            </p>
          </div>
          <FormButton
            text="Post a task for free"
            href={ROUTES.POST_TASK}
            className="w-fit"
          />
        </div>
        <div className="flex-1 w-full flex items-center">
          <div className="relative w-full">
            <Image
              src={BgShape}
              alt=""
              width={542}
              height={800}
              className="absolute -top-[8%] max-w-[33.875rem] w-[85%] left-1/2 -translate-x-[50%]"
            />
            <div className="max-w-[28.125rem] w-[70%] translate-x-0 mx-auto">
              <Image
                src={Chef}
                alt=""
                width={542}
                height={800}
                className="object-cover w-full h-auto rounded-30"
              />
            </div>
          </div>
        </div>
        <span className="w-[7.625rem] h-[7.625rem] rounded-full bg-red-light-1 absolute -bottom-[60px] left-[25%]"></span>
      </div>
    </div>
  );
};

export default Hero;
