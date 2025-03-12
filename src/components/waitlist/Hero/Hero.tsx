"use client";
import React from "react";
import Image from "next/image";
import Chef from "@/../public/images/hiw-4.svg";
import BgShape from "@/../public/images/shape_bg/bg_shape_4.png";
import HeroButton from "./HeroButton";
import UnderlinedHeader from "@/components/reusables/UnderlinedHeader";
import Icons from "@/components/Icons";
import TaskerStats from "@/components/TaskerStats";

const Hero = () => {
  return (
    <div className="bg-dark-secondary relative overflow-hidden">
      <div className="container pt-[8.875rem] pb-[5.25rem]">
        <div className="flex flex-col xl:flex-row items-center gap-6 justify-between">
          <div className="flex-1 w-full h-fit mb-[60px] xl:mb-0 relative">
          <div className="w-full xl:max-w-[40.875rem]">
              <h2 className="hidden sm:block text-xl sm:text-[4rem] font-bold leading-normal mb-3 sm:mb-5 text-white text-center xl:text-left">
                Get to-dos{" "}
                <UnderlinedHeader
                  text="Done,"
                  lineStyle="rotate-[3deg] sm:top-[75%]"
                />
               Anytime, Anywhere.
              </h2>
              <h2 className="sm:hidden text-4xl sm:text-[4rem] font-bold leading-normal mb-3 sm:mb-5 text-white text-center xl:text-left">
                Get to-dos{" "}
                <UnderlinedHeader
                  text="done"
                  lineStyle="rotate-[1deg] top-[80%]"
                />{" "}
                Anytime, Anywhere
              </h2>
              <p className="text-sm sm:text-xl font-normal text-dark-grey-1 text-center xl:text-left">
              Post it. Match it. Done
              </p>
            </div>
            <HeroButton />
            <Icons.ribbon className="absolute top-[100%] xl:top-[90%] left-[74%] xl:left-[40%] w-[80px] sm:w-auto max-w-[125px] rotate-[10.308deg]" />
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
              <div className="relative top-0 max-w-[28.125rem] w-[70%] translate-x-0 mx-auto">
                <Image
                  src={Chef}
                  alt=""
                  width={542}
                  height={800}
                  className="object-cover w-full h-auto rounded-30"
                />
                <TaskerStats extraClass="absolute bottom-[10%] -right-[10%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="w-[5.5rem] h-[5.5rem] md:w-[7.625rem] md:h-[7.625rem] bg-red-light-1 rounded-full absolute  -left-[50px] top-1/2 md:top-[calc(100%-62px)] -translate-y-[70%] md:translate-y-0"></span>
    </div>
  );
};

export default Hero;
