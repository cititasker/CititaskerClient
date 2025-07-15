"use client";
import { useRef } from "react";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";

interface IProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: any;
  tasker?: boolean;
}
const AccordionItem = ({
  question,
  tasker,
  answer,
  isOpen,
  onClick,
}: IProps) => {
  const contentHeight = useRef<any>(null);

  return (
    <div className="border-[1.5px] border-[#45485B] rounded-lg sm:rounded-2xl overflow-hidden mb-4 last:mb-0">
      <button
        className={`w-full text-left p-2.5 sm:p-6 flex justify-between items-center bg-transparent border-none cursor-pointer ${
          isOpen ? "active" : ""
        }`}
        onClick={onClick}
      >
        <p
          className={` ${
            tasker ? "font-bold" : "font-semibold"
          }  text-[14px] sm:text-base ${
            isOpen ? "text-primary" : "text-[#161A32]"
          }`}
        >
          {question}
        </p>
        {isOpen ? (
          <FaCircleMinus className="shrink-0 text-sm sm:text-2xl text-primary" />
        ) : (
          <FaCirclePlus className="shrink-0 text-sm sm:text-2xl" />
        )}
      </button>

      <div
        ref={contentHeight}
        className="px-[0.625rem] sm:px-6 transition-all duration-300"
        style={
          isOpen
            ? { height: contentHeight.current.scrollHeight + 26 }
            : { height: "0px" }
        }
      >
        <p className="text-[14px] sm:text-base">{answer}</p>
      </div>
    </div>
  );
};

export default AccordionItem;
