"use client";
import React from "react";
import FormButton from "./forms/FormButton";
import { ROUTES } from "@/constant";

const LandingPageHero = () => {
  return (
    <div className="relative w-full min-h-[70dvh] md:min-h-[31.25rem] md:max-h-full">
      <div className="absolute top-0 left-0  w-full h-full bg-dark-secondary md:bg-[rgb(2,22,55)]/40 z-10 flex items-center">
        <div className="max-w-[54.25rem] mx-auto md:ml-0 text-white px-[16px] md:px-[57px]">
          <div className="mb-[2rem] mt-[15%] text-center sm:text-left">
            <h1 className="text-2xl md:text-[2.875rem] max-w-[822px] lg:text-[4.375rem] text-white font-bold leading-normal mb-3 sm:mb-[0.875rem]">
              Get your to-dos done just in minutes.
            </h1>
            <p className="text-base sm:text-[20px] md:text-[40px] sm:text-xl">
              Find the right help for your tasks
            </p>
          </div>
          <div className="pb-0 md:pb-20 flex items-center flex-wrap gap-4 w-fit mx-auto sm:ml-0">
            <FormButton
              text="Post a task for free"
              className="flex-1 bg-secondary md:bg-primary"
              href={ROUTES.POST_TASK}
            />
            <FormButton
              text="Become a Tasker"
              className="flex-1 bg-primary md:hidden"
              href={ROUTES.POST_TASK}
            />
          </div>
        </div>
      </div>

      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-screen object-cover hidden md:block"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default LandingPageHero;
