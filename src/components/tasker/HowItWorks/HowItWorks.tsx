import UnderlinedHeader from "@/components/reusables/UnderlinedHeader";
import React from "react";
import HowItWorkItem from "./HowItWorkItem";

const data = [
  {
    title: "Safety",
    text: "Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ",
  },
  {
    title: "Tranparency",
    text: "Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ",
  },
  {
    title: "Data Privacy",
    text: "Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ",
  },
];
const HowItWorks = () => {
  return (
    <div className="bg-dark-secondary" id="how_it_works">
      <div className="container lg:px-[9.375rem] py-[4.375rem] pb-[7.125rem]">
        <h2 className="text-[2.5rem] font-bold leading-normal max-w-[28.25rem] mx-auto text-center text-white mb-[5.375rem]">
          How <UnderlinedHeader text="CitiTasker" /> Works
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[5.5rem]">
          {data.map((el, i) => (
            <HowItWorkItem key={i} data={{ ...el, id: i }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
