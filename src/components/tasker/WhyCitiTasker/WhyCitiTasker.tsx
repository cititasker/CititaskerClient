import React from "react";
import WhyCitiTaskerList from "./WhyCitiTaskerList";

const WhyCitiTasker = () => {
  return (
    <div className="">
      <div className="container pb-[5.875rem] pt-[3.875rem]">
        <div className="mb-[3.75rem] max-w-[45.625rem] mx-auto">
          <h1 className="header mb-5">Why Choose CitiTasker?</h1>
          <p className="font-normal text-base text-center">
            Borem ipsum dolor sit amet, consectetur adipiscing elit. Borem ipsum
            dolor sit amet, consectetur adipiscing elit. Borem ipsum dolor sit
            amet, consectetur adipiscing elit. Borem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
        </div>
        <WhyCitiTaskerList />
      </div>
    </div>
  );
};

export default WhyCitiTasker;
