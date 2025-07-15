import UnderlinedHeader from "@/components/reusables/UnderlinedHeader";
import React from "react";
import { IPeople, IShieldTick, ISignPost } from "@/constant/icons";
import HowItWorkItem from "../../_components/HowItWorkItem";

const data = [
  {
    title: "Browse task",
    text: "Sign up for free and  browse for tasks that match your expertise and location. Use filters to refine your search",
    icon: ISignPost,
  },
  {
    title: "Make an offer",
    text: "Found the task that matches your skills? Set your price and make an offer. Keep your pricing competitive and fair.",
    icon: IPeople,
  },
  {
    title: "Complete the task. Get paid.",
    text: "Complete the task, mark as completed and request payment. The customer will receive the request and instantly release payment.",
    icon: IShieldTick,
  },
];
const HowItWorks = () => {
  return (
    <div className="bg-white" id="how_it_works">
      <div className="container-w py-[3.625rem] sm:py-[4.75rem] md:pb-[7.125rem]">
        <h2 className="text-[2rem] sm:text-[2.5rem] font-bold leading-normal text-center text-black mb-[3.5rem] sm:mb-[5.375rem]">
          Start earning on <span className="sm:hidden">CitiTasker</span>{" "}
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
