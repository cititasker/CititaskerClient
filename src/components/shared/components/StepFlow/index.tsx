import React from "react";
import UnderlinedHeader from "@/components/reusables/UnderlinedHeader";
import StepFlowItem from "./StepFlowItem";

interface HowItWorkDataItem {
  title: string;
  text: string;
  icon: React.ReactNode;
}

interface StepFlowProps {
  title?: string;
  highlightedText?: string;
  items: HowItWorkDataItem[];
  containerClassName?: string;
  sectionId?: string;
}

const StepFlow: React.FC<StepFlowProps> = ({
  title = "Get your to-dos done on",
  highlightedText = "CitiTasker",
  items,
  containerClassName = "",
  sectionId = "how_it_works",
}) => {
  return (
    <div className="bg-white" id={sectionId}>
      <div
        className={`container-w py-[3.625rem] sm:py-[4.75rem] md:pb-[7.125rem] ${containerClassName}`}
      >
        <h2 className="text-[2rem] sm:text-[2.5rem] font-bold leading-normal text-center text-black mb-[3.5rem] sm:mb-[5.375rem]">
          {title} <span className="sm:hidden">{highlightedText}</span>{" "}
          <UnderlinedHeader
            text={highlightedText}
            extraStyle="hidden sm:inline-block"
          />{" "}
          in easy steps
        </h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(100%,1fr))] md:grid-cols-2 xl:grid-cols-3 gap-x-[4.375rem] xl:gap-x-[5.5rem] max-w-[1192px] mx-auto">
          {items.map((el, i) => (
            <StepFlowItem key={i} data={{ ...el, id: i }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepFlow;
