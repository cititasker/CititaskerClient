"use client";
import Image from "next/image";
import React from "react";
import FormButton from "../forms/FormButton";
import { useAppDispatch } from "@/store/hook";
import { toggleWaitlistModal } from "@/store/slices/general";

const TaskerBanner = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="container py-[3.25rem] sm:py-[116px]">
        <div className="flex items-stretch justify-between gap-x-[22px] gap-y-[80px] flex-col xl:flex-row">
          <div className="transition-all duration-300 p-5 sm:py-[62px] sm:px-[73px] bg-dark-secondary xl:bg-secondary rounded-[1.25rem] sm:rounded-[1.875rem] flex-1">
            <div className="mb-5 sm:mb-[3.25rem]">
              <h2 className="text-base sm:text-xl md:text-3xl lg:text-[2.5rem] font-bold text-white mb-2 sm:mb-5">
                Get Started for Free
              </h2>
              <p className="text-white text-xs sm:text-base">
                Becoming a Tasker is completely free! No hidden charges or
                subscription fees—just sign up and start earning.
              </p>
            </div>
            <FormButton
              text="Join waitlist"
              handleClick={() => dispatch(toggleWaitlistModal())}
            />
          </div>
          <div className="w-full xl:max-w-[463px] h-[340px] xl:h-[374px] relative bg-secondary rounded-[1.25rem] sm:rounded-[1.875rem]">
            <div className="rounded-[1.25rem] sm:rounded-[1.875rem] w-full h-full bg-transparent relative overflow-hidden">
              <span className="inline-block absolute bg-[#F2AF42] top-5 left-5 rounded-full h-[35px] xl:h-[50px] w-[35px] xl:w-[50px]"></span>
              <span className="inline-block absolute bg-[#FB9596] xl:bg-[#FF7701] -bottom-[30px] -left-[30px] xl:-bottom-[45px] xl:-left-[40px] rounded-full h-[85px] w-[85px] xl:h-[105px] xl:w-[105px]"></span>
              <span className="inline-block absolute bg-[#C9F07D] top-[50%] left-[30%] translate-y-[-50%] translate-x-[-50%] rounded-full h-[85px] w-[85px] xl:h-[120px] xl:w-[120px]"></span>
              <span className="inline-block absolute bg-primary -top-[30px] -right-[100px] xl:-right-[110px] rounded-full h-[280px] w-[280px] xl:h-[300px] xl:w-[300px]"></span>
            </div>
            <Image
              src="/images/tasker_lady.svg"
              alt="banner"
              width={463}
              height={374}
              className="h-[125%] w-full absolute bottom-0  object-cover object-[-250px,0]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskerBanner;
