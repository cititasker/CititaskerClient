import React from "react";
import UnderlinedHeader from "@/components/reusables/UnderlinedHeader";
import WhyCitiTaskerList from "./WhyCitiTaskerList";

interface WhyCitiTaskerProps {
  title?: string;
  highlightedText?: string;
  subtitle?: string;
  features: any[];
}

const WhyCitiTasker: React.FC<WhyCitiTaskerProps> = ({
  title = "Why join",
  highlightedText = "CitiTasker",
  subtitle,
  features,
}) => {
  return (
    <div className="">
      <div className="container-w py-10 sm:pb-[5.875rem] sm:pt-[3.875rem]">
        {(title || highlightedText || subtitle) && (
          <div className="hidden md:block mb-[6rem] max-w-[45.625rem] mx-auto">
            <h1 className="header mb-5">
              {title} <UnderlinedHeader text={highlightedText} /> as a Tasker
            </h1>
            {subtitle && (
              <p className="font-normal text-base text-center">{subtitle}</p>
            )}
          </div>
        )}
        <WhyCitiTaskerList sections={features} />
      </div>
    </div>
  );
};

export default WhyCitiTasker;
