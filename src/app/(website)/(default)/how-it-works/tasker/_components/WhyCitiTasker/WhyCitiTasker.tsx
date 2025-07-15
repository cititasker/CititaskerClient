import React from "react";
import WhyCitiTaskerList from "./WhyCitiTaskerList";
import UnderlinedHeader from "@/components/reusables/UnderlinedHeader";

const WhyCitiTasker = () => {
  return (
    <div className="">
      <div className="container-w py-10 sm:pb-[5.875rem] sm:pt-[3.875rem]">
        <div className="hidden md:block mb-[6rem] max-w-[45.625rem] mx-auto">
          <h1 className="header mb-5">
            Why join <UnderlinedHeader text="CitiTasker" /> as a Tasker
          </h1>
          <p className="font-normal text-base text-center">
            CitiTasker is the ultimate platform for people looking to turn their
            skills into income.
          </p>
        </div>
        <WhyCitiTaskerList />
      </div>
    </div>
  );
};

export default WhyCitiTasker;
