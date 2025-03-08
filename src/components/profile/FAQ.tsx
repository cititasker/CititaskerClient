import React from "react";
import CustomAccordion from "../Accordion/CustomAccordion";
import { accordionData } from "../../../data";

const FAQ = () => {
  return (
    <div className="px-10">
      <div className="max-w-[740px]">
        <CustomAccordion data={accordionData} />
      </div>
    </div>
  );
};

export default FAQ;
