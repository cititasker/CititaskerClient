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
    text: "Assign a tasker in one click. Choose by reviews, skills and price. ",
  },
];

const HowItWorks = () => {
  return (
    <div className="container py-[5.125rem]" id="how_it_works">
      <div className="mb-[3.375rem] sm:mb-[3.75rem] max-w-[45.625rem] mx-auto">
        <h1 className="header mb-[0.688rem] sm:mb-5">
          How does CitiTasker work?
        </h1>
        <p className="text-xs font-normal sm:text-base text-center">
          Borem ipsum dolor sit amet, consectetur adipiscing elit. Borem ipsum
          dolor sit amet, consectetur adipiscing elit. adipiscing elit. Borem
          ipsum dolor sit amet, consectetur adipiscing.
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
