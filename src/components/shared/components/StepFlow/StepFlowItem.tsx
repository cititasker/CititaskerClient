import React from "react";
import { cn } from "@/lib/utils";
// import UnderlinedHeader from "@/components/reusables/UnderlinedHeader";
import Icons from "@/components/Icons";

// Types
interface StepFlowItem {
  title: string;
  text: string;
  icon: React.ComponentType<any>;
}

// Individual Step Item Component
const StepFlowItem = ({
  data,
  index,
  totalItems,
}: {
  data: StepFlowItem & { id: number };
  index: number;
  totalItems: number;
}) => {
  const { title, text, icon: Icon } = data;
  const isLastItem = index === totalItems - 1;

  return (
    <div className="relative flex flex-col items-center">
      {/* Main Card - Matching Original Design */}
      <div className="min-h-[330px] py-11 px-7 bg-light-primary-2 rounded-[1.625rem] border-2 border-dark-grey-2 hover:border-primary-400 transition-colors duration-300">
        {/* Icon Container */}
        <div className="p-3.5 mx-auto w-[60px] h-[60px] rounded-full flex items-center justify-center bg-light-primary-1">
          <Icon />
        </div>

        {/* Content */}
        <div className="text-center">
          <p className="my-6 text-xl text-black font-semibold">{title}</p>
          <p className="text-black font-normal text-base">{text}</p>
        </div>
      </div>

      {/* Arrow Indicators - Matching Original Logic */}
      {!isLastItem && (
        <>
          {/* Desktop/Tablet Horizontal Arrows */}
          <Icons.curvedArrow
            className={cn(
              "h-[70px] xl:h-auto absolute top-1/2 left-full -translate-y-1/2 -mx-3 xl:mx-0",
              // Show for first item on md+ screens
              index === 0 && "hidden md:inline-block",
              // Show for second item only on xl+ screens
              index === 1 && "hidden xl:inline-block",
              // Hide for last item
              index === totalItems - 1 && "hidden"
            )}
          />

          {/* Mobile Vertical Arrows */}
          <Icons.curvedArrow
            className={cn(
              "h-[70px] rotate-90 mt-4",
              // Show for first item on mobile only
              index === 0 && "inline-block xl:hidden",
              // Show for second item on mobile and tablet only
              index === 1 && "inline-block md:hidden",
              // Hide for last item
              index === totalItems - 1 && "hidden"
            )}
          />
        </>
      )}
    </div>
  );
};

export default StepFlowItem;
