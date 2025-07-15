"use client";
import { useState } from "react";
import AccordionItem from "./AccordionItem";

interface IProps {
  question: string;
  answer: string;
}
interface CustomAccordionProps {
  data: IProps[];
  tasker?: boolean; 
}
const CustomAccordion = ({ data, tasker }: CustomAccordionProps) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = (index: any) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="w-full">
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          tasker={tasker}
          question={item.question}
          answer={item.answer}
          isOpen={activeIndex === index}
          onClick={() => handleItemClick(index)}
        />
      ))}
    </div>
  );
};

export default CustomAccordion;
