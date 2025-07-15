import UnderlinedHeader from "@/components/reusables/UnderlinedHeader";
import React from "react";
import { IPeople, IShieldTick, ISignPost } from "@/constant/icons";
import HowItWorkItem from "../../_components/HowItWorkItem";

const data = [
  {
    title: "Post your task",
    text: "Describe what you need done, include details like location and timeframe, and suggest a budget. Posting is completely free!",
    icon: ISignPost,
  },
  {
    title: "Pick a Tasker",
    text: "Receive quotes from verified Taskers in minutes. Check their profiles, reviews, and skills to select the best fit for your job.",
    icon: IPeople,
  },
  {
    title: "Get it done",
    text: "Collaborate with your Tasker to complete the job. Communicate via private messaging to manage all details.",
    icon: IShieldTick,
  },
];
const HowItWorks = () => {
  return (
    <div className="bg-white" id="how_it_works">
      <div className="container-w py-[3.625rem] sm:py-[4.75rem] md:pb-[7.125rem]">
        <h2 className="text-[2rem] sm:text-[2.5rem] font-bold leading-normal text-center text-black mb-[3.5rem] sm:mb-[5.375rem]">
          Get your to-dos done on <span className="sm:hidden">CitiTasker</span>{" "}
          <UnderlinedHeader
            text="CitiTasker"
            extraStyle="hidden sm:inline-block"
          />{" "}
          in easy steps
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(100%,1fr))] md:grid-cols-2 xl:grid-cols-3 gap-x-[4.375rem] xl:gap-x-[5.5rem] max-w-[1192px] mx-auto">
          {data.map((el, i) => (
            <HowItWorkItem key={i} data={{ ...el, id: i }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
