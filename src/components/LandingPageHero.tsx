"use client";
import Image from "next/image";
import React from "react";
import Hero from "@/../public/images/hero.png";
import FormButton from "./forms/FormButton";
import UnderlinedHeader from "./reusables/UnderlinedHeader";
import FadeUp from "./reusables/FadeUp";
import { statsData } from "../../data";

const LandingPageHero = () => {
  return (
    <div className="">
      <div className="relative w-full min-h-[31.25rem] md:max-h-full">
        <div className="absolute top-0 left-0  w-full h-full bg-dark-secondary md:bg-[rgb(2,22,55)]/70 z-10 flex items-center">
          <div className="max-w-[60rem] mx-auto px-[30px] mt-[15%] md:mt-0">
            <div className="max-w-[54.25rem] mx-auto text-white">
              <div className="mb-[3.625rem] md:mb-[9.375rem]">
                <FadeUp transition={{ duration: 0.5 }}>
                  <h1 className="text-2xl sm:text-[2.875rem] md:text-[4.375rem] font-bold leading-normal text-center mb-3 sm:mb-[0.875rem]">
                    Get your todos{" "}
                    <UnderlinedHeader text="done" lineStyle="sm:top-[80%]" />{" "}
                    just in minutes.
                  </h1>
                </FadeUp>
                <FadeUp transition={{ duration: 0.5, delay: 0.2 }}>
                  <p className="text-center text-base sm:text-xl">
                    Find the right people for anything you need.
                  </p>
                </FadeUp>
              </div>
              <div>
                <FadeUp transition={{ duration: 0.5, delay: 0.4 }}>
                  <div className="flex items-center gap-3 sm:gap-6 w-fit mx-auto mb-8">
                    <FormButton
                      text="Post a task for free"
                      btnStyle="text-sm"
                      href="/post-task"
                    />
                    <FormButton
                      href="/tasker"
                      text="Become a Tasker"
                      btnStyle="bg-secondary text-sm"
                    />
                  </div>
                </FadeUp>
                <div className="w-fit mx-auto flex justify-between items-center gap-3 sm:gap-10 flex-wrap">
                  {statsData.map((item, i) => (
                    <FadeUp key={i} transition={{ duration: 0.5, delay: 0.6 }}>
                      <div>
                        <Image
                          src={item.icon}
                          alt=""
                          width={20}
                          height={20}
                          className="object-contain mx-auto block w-3 h-auto sm:w-5"
                        />
                        <p className="mt-2 text-white text-xs sm:text-base font-normal">
                          {item.stat}
                        </p>
                      </div>
                    </FadeUp>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Image
          src={Hero}
          alt=""
          className="w-full h-screen object-cover hidden md:block"
        />
      </div>
    </div>
  );
};

export default LandingPageHero;
