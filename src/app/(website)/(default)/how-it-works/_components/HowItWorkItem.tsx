import Icons from "@/components/Icons";
import { cn } from "@/lib/utils";
import React from "react";

interface IProps {
  data: {
    id: number;
    title: string;
    text: string;
    icon: any;
  };
}
const HowItWorkItem = ({ data: { id, title, text, icon: Icon } }: IProps) => {
  console.log("res", id);
  return (
    <div className="relative flex flex-col items-center">
      <div className="min-h-[330px] py-[2.75rem] px-[1.875rem] bg-light-primary-2 rounded-[1.625rem] border-2 border-dark-grey-2">
        <div className="p-[0.875rem] mx-auto w-[60px] h-[60px] rounded-full flex items-center justify-center bg-light-primary-1">
          <Icon />
        </div>
        <p className="text-center my-[1.625rem] text-xl text-black font-semibold">
          {title}
        </p>
        <p className="text-center text-black font-normal text-base">{text}</p>
      </div>
      <Icons.curvedArrow
        className={cn(
          "h-[70px] xl:h-auto absolute top-1/2 bottom-1/2 left-full translate-y-[-50%] -m-3 xl:m-0",
          id === 2 && "hidden",
          id === 1 && "hidden xl:inline-block",
          id === 0 && "hidden md:inline-block"
        )}
      />
      <Icons.curvedArrow
        className={cn(
          "h-[70px] rotate-90",
          id === 2 && "hidden",
          id === 0 ? "inline-block xl:hidden" : "hidden",
          id === 1 && "inline-block md:hidden"
        )}
      />
    </div>
  );
};

export default HowItWorkItem;
