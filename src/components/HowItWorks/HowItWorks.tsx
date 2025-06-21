import React from "react";
import SlidingImageCarousel from "./SlidingImageCarousel";
import HowItWorksListItem from "./HowItWorksListItem";

const data = [
  {
    id: "1",
    title: "Post your tasks for FREE",
    text: "Tell us what you need and start receiving offers in minutes.",
  },
  {
    id: "2",
    title: "Offers come to you",
    text: "Get offers from trusted Taskers and assign the best tasker to the job by reviewing their profiles. ",
  },
  {
    id: "3",
    title: "Get it done",
    text: "Tasker completes the task, you release payment a give a review. ",
  },
];

const HowItWorks = () => {
  return (
    <div className="container bg-white py-[5.125rem]" id="how_it_works">
      <div className="mb-[3.375rem] sm:mb-[3.75rem] max-w-[45.625rem] mx-auto">
        <h1 className="header mb-[0.688rem] sm:mb-5">
          How does CitiTasker work?
        </h1>
        <p className="text-[14px] md:text-[18px] font-normal text-center">
         CitiTasker connects you with verified Taskers to get your tasks done effortlessly. Here's how it works:
        </p>
      </div>
      <div className="max-w-[74rem] mx-auto gap-x-5 flex justify-between items-center flex-col xl:flex-row">
        <SlidingImageCarousel />
        <div className="max-w-full xl:max-w-[31.25rem] mt-[4.25rem] xl:mt-0">
          {data.map((item) => (
            <HowItWorksListItem key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
