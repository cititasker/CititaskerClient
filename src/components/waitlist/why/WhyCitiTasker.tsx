"use client";
import React, { useState } from "react";
import UnderlinedHeader from "../../reusables/UnderlinedHeader";
import CustomTabs from "../../reusables/CustomTabs";
import WhyJoinCititasker from "./WhyJoinCititasker";
import { posterData, taskerData } from "../../../../data";

const WhyCitiTasker = () => {
  const [user, setUser] = useState("poster");

  const handleTabToggle = (value: string) => {
    setUser(value);
  };
  return (
    <div className="bg-light-primary-1" id="why_cititasker">
      <div className="container pt-[1.625rem] sm:pt-[3.75rem] pb-[3.125rem] sm:pb-[6.25rem]">
        <div className="max-w-[49.375rem] mx-auto mb-[1.75rem] sm:mb-[4rem]">
          <div className="w-fit font-bold mx-auto text-center text-base sm:text-[2.5rem] mb-[0.875rem] sm:mb-[1.875rem]">
            Why Join{" "}
            <UnderlinedHeader text="CitiTasker?" lineStyle="sm:top-full" />
          </div>
          <p className="text-sm sm:text-[1.25rem] text-dark-secondary text-center leading-normal">
            Borem ipsum dolor sit amet, consectetur adipiscing elit. Borem ipsum
            dolor sit amet, consectetur adipiscing elit. Borem ipsum dolor sit
            amet.
          </p>
        </div>
        <div className="w-full rounded-[2.5rem] bg-white pt-[1.625rem] pb-[3.75rem] sm:py-[3.25rem] px-5 md:px-[5.875rem]">
          <CustomTabs
            userType={user}
            handleTabToggle={handleTabToggle}
            extraStyle="!mb-[1.75rem]"
          />
          {user === "poster" ? (
            <div className="text-xs sm:text-xl text-center max-w-[56.875rem] mx-auto font-semibold mb-[1.75rem] sm:mb-[3.75rem]">
              <span className="text-primary">Who is a Poster?</span> Qorem ipsum
              dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero
              et velit interdum, ac aliquet odio mattis. Class aptent taciti
              sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos. adipiscing.
            </div>
          ) : (
            <div className="text-xs sm:text-xl text-center max-w-[56.875rem] mx-auto font-semibold mb-[1.75rem] sm:mb-[3.75rem]">
              <span className="text-primary">Who is a Tasker?</span> Qorem ipsum
              dolor sit amet, adipiscing elit. Nunc vulputate libero et velit
              interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad
              litora torquent per conubia.
            </div>
          )}
          {user === "poster" ? (
            <WhyJoinCititasker img="/images/poster.svg" data={posterData} />
          ) : (
            <WhyJoinCititasker img="/images/tasker.svg" data={taskerData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WhyCitiTasker;
