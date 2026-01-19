import React from "react";

interface IProps {
  id: string;
  title: string;
  text: string;
}
const HowItWorksListItem = ({ data }: { data: IProps }) => {
  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 p-[1.375rem] sm:p-8 mb-8 last:mb-0 transition-colors duration-500 hover:from-primary-200 hover:to-primary-100 cursor-default">
      <div className="flex gap-3 sm:gap-5">
        <div
          // className="shrink-0 w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center text-white font-normal text-[1.375rem] bg-primary-500"
          className="bg-primary-500 flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
        >
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
