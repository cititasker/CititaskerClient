import Image from "next/image";
import React, { useState } from "react";
import AccordionItem from "./AccordionItem";

interface IProps {
  img: string;
  data: {
    question: string;
    answer: string;
  }[];
}
const WhyJoinCititasker = ({ img, data }: IProps) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = (index: any) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-y-[3.125rem] gap-x-5 max-w-[67.5rem] w-full mx-auto">
      <Image
        src={img}
        alt=""
        width={260}
        height={350}
        className="rounded-[1.25rem] lg:rounded-[1.875rem] w-full lg:w-[260px] lg:max-w-[460px] flex-1"
      />
      <div className="lg:max-w-[32.5rem] w-full flex-1">
        {data.map((item, index) => (
          <AccordionItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={activeIndex === index}
            onClick={() => handleItemClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default WhyJoinCititasker;
