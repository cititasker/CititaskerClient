"use client";
import React, { useState } from "react";
import UnderlinedHeader from "../../reusables/UnderlinedHeader";
import CustomTabs from "../../reusables/CustomTabs";
import WhyJoinCititasker from "./WhyJoinCititasker";
import { posterData, taskerData } from "../../../../data";
import { ROLE } from "@/constant";

const WhyCitiTasker = () => {
  const [user, setUser] = useState<TRole>(ROLE.poster);

  const handleTabToggle = (value: TRole) => {
    setUser(value);
  };
  return (
    <div className="bg-light-primary-1 relative">
      <div id="why_cititasker" className="absolute w-full -top-[95px]" />
      <div className="container pt-[1.625rem] sm:pt-[3.75rem] pb-[3.125rem] sm:pb-[6.25rem]">
        <div className="max-w-[49.375rem] mx-auto mb-[1.75rem] sm:mb-[4rem]">
          <div className="w-fit font-bold mx-auto text-center text-base sm:text-[2.5rem] mb-[0.875rem] sm:mb-[1.875rem]">
            Why Join{" "}
            <UnderlinedHeader text="CitiTasker?" lineStyle="sm:top-full" />
          </div>
          <p className="text-sm sm:text-[1.25rem] text-dark-secondary text-center leading-normal">
            CitiTasker is the ultimate platform for connecting you with skilled
            Taskers who can help tackle your to-do list. Whether you need help
            with errands, household repairs, or specialized projects, CitiTasker
            makes it simple and hassle-free.
          </p>
        </div>
        <div className="w-full rounded-[2.5rem] bg-white pt-[1.625rem] pb-[3.75rem] sm:py-[3.25rem] px-5 md:px-[5.875rem]">
          <CustomTabs
            userType={user}
            handleTabToggle={handleTabToggle}
            extraStyle="!mb-[1.75rem]"
          />
          {user === ROLE.poster ? (
            <div className="text-xs sm:text-xl text-center max-w-[56.875rem] mx-auto font-normal mb-[1.75rem] sm:mb-[3.75rem]">
              <span className="text-primary font-semibold">
                Who is a Poster?
              </span>{" "}
              A Poster is someone who needs assistance with a task and uses
              CitiTasker to connect with skilled Taskers. From running errands,
              and household repairs, to professional tasks, Posters can easily
              find help through our platform.
            </div>
          ) : (
            <div className="text-xs sm:text-xl text-center max-w-[56.875rem] mx-auto font-normal mb-[1.75rem] sm:mb-[3.75rem]">
              <span className="text-primary font-semibold">
                Who is a Tasker?
              </span>{" "}
              A Tasker is a skilled service provider who completes tasks posted
              on CitiTasker. From artisans like plumbers and electricians to
              cleaners and other professionals, Taskers help Posters get their
              jobs done efficiently.
            </div>
          )}
          {user === ROLE.poster ? (
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
