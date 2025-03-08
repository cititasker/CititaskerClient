"use client";
import React from "react";
import HeroImage1 from "@/../public/images/tasker_hero.svg";
import HeroImage2 from "@/../public/images/tasker_hero2.svg";
import UnderlinedHeader from "../../reusables/UnderlinedHeader";
import HeroCarousel from "./HeroCarousel";
import FormButton from "@/components/forms/FormButton";

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
      <div className="container overflow-hidden relative pt-[12.5rem] pb-[5.25rem] flex items-center gap-5 justify-between">
        <div className="max-w-[34.875rem] w-full">
          <div className="text-white mb-[3.75rem]">
            <h2 className="text-[4rem] font-bold leading-normal">
              Be your own <UnderlinedHeader text="boss" /> and earn as you
              desire.
            </h2>
            <p className="mt-5 text-xl font-normal">
              Find the right people for anything you need.
            </p>
          </div>
          <FormButton
            text="Start earning on citiTasker"
            href="#"
            btnStyle="bg-secondary"
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
