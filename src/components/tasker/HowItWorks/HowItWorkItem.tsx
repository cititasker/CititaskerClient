import Icons from "@/components/Icons";
import React from "react";

interface IProps {
  data: {
    id: number;
    title: string;
    text: string;
  };
}
const HowItWorkItem = ({ data: { id, title, text } }: IProps) => {
  return (
    <div className="relative">
      <div className="py-[2.75rem] px-[1.875rem] bg-white rounded-[1.625rem]">
        <div className="p-[0.875rem] w-fit mx-auto">
          <Icons.safety />
        </div>
        <p className="text-center my-[1.625rem] text-xl text-dark-secondary font-semibold">
          {title}
        </p>
        <p className="text-center text-dark-secondary font-normal text-base">
          {text}
        </p>
      </div>
      <Icons.curvedArrow
        className={`absolute top-1/2 bottom-1/2 left-full translate-y-[-50%] ${
          id === 2 && "hidden"
        }`}
      />
    </div>
  );
};

export default HowItWorkItem;
