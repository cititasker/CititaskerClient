"use client";
import React from "react";
import HeroImage1 from "@/../public/images/tasker_hero.svg?url";
import HeroImage2 from "@/../public/images/tasker_hero2.svg?url";
import HeroCarousel from "./HeroCarousel";
import FormButton from "@/components/forms/FormButton";
import UnderlinedHeader from "@/components/reusables/UnderlinedHeader";

const imagesData = [
  {
    img: HeroImage1,
  },
  {
    img: HeroImage2,
  },
];

const Hero = () => {
  return (
    <div className="bg-dark-secondary">
      <div className="container-w overflow-hidden relative pt-[8rem] md:pt-[12.5rem] pb-[5.25rem] flex flex-col md:flex-row items-center gap-y-12 gap-x-5 justify-between">
        <div className="max-w-[34.875rem] w-full flex flex-col items-center md:items-start">
          <div className="text-white mb-9 md:mb-[3.75rem] text-center md:text-left">
            <h2 className="text-[2.375rem] sm:text-[3rem] lg:text-[4rem] font-bold leading-normal">
              Be your own <UnderlinedHeader text="boss" /> and earn as you
              desire.
            </h2>
            <p className="mt-5 text-base sm:text-xl font-normal">
              Find the right people for anything you need.
            </p>
          </div>
          <FormButton
            text="Start earning on citiTasker"
            href="#"
            className="w-fit"
          />
        </div>
        <div className="max-w-[38.125rem] w-full">
          <HeroCarousel images={imagesData} extraClass="mx-auto" />
        </div>
        <span className="w-[7.625rem] h-[7.625rem] rounded-full bg-red-light-1 absolute -bottom-[60px] left-[25%]"></span>
      </div>
    </div>
  );
};

export default Hero;
