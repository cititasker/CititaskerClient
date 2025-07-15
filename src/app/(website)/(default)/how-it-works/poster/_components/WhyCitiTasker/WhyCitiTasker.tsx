import React from "react";
import WhyCitiTaskerList from "./WhyCitiTaskerList";
import UnderlinedHeader from "@/components/reusables/UnderlinedHeader";

const WhyCitiTasker = () => {
  return (
    <div className="">
      <div className="container-w py-10 sm:pb-[5.875rem] sm:pt-[3.875rem]">
        <div className="hidden md:block mb-[6rem] max-w-[45.625rem] mx-auto">
          <h1 className="header mb-5">
            Why you should post your next task on{" "}
            <UnderlinedHeader text="CitiTasker" />
          </h1>
          <p className="font-normal text-base text-center">
            Getting things done has never been easier. CitiTasker simplifies the
            process of finding help for your tasks, offering a secure and
            reliable platform to connect with trusted Taskers.
          </p>
        </div>
        <WhyCitiTaskerList />
      </div>
    </div>
  );
};

export default WhyCitiTasker;
