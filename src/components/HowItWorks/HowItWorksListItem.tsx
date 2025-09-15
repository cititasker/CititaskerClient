import React from "react";

interface IProps {
  id: string;
  title: string;
  text: string;
}
const HowItWorksListItem = ({ data }: { data: IProps }) => {
  return (
    <div className="w-full rounded-[1rem] md:rounded-30 bg-light-primary-1 p-[1.375rem] sm:px-[2.125rem] sm:py-12 mb-8 last:mb-0 transition-colors duration-500 hover:bg-light-primary-2 cursor-default">
      <div className="flex gap-3 sm:gap-5">
        <div className="shrink-0 w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center text-white font-normal text-[1.375rem] bg-primary">
          {data.id}
        </div>
        <div>
          <p className="mb-2 sm:mb-4 text-lg sm:text-2xl font-semibold">
            {data.title}
          </p>
          <p className="text-base sm:text-lg font-normal">{data.text}</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksListItem;
