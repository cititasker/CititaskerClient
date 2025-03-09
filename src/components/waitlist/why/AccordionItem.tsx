"use client";
import Icons from "@/components/Icons";
import { useRef } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";

interface IProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: any;
}
const AccordionItem = ({ question, answer, isOpen, onClick }: IProps) => {
  const contentHeight = useRef<any>(null);

  return (
    <div
      className={`transition-all duration-300 rounded-lg sm:rounded-2xl overflow-hidden mb-4 last:mb-0 ${
        isOpen ? "bg-dark-secondary" : "bg-light-primary-1 "
      }`}
    >
      <button
        className={`w-full text-left p-2.5 sm:p-6 flex justify-between items-center bg-transparent border-none cursor-pointer ${
          isOpen ? "active" : ""
        }`}
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <Icons.copyIconPrimary
            fill="#236F8E"
            className="w-[1.875rem] h-[1.875rem]"
          />
          <p
            className={` font-semibold text-xs sm:text-lg ${
              isOpen ? "text-white" : "text-[#161A32]"
            }`}
          >
            {question}
          </p>
        </div>
        <HiOutlineChevronDown
          className={`text-xs sm:text-2xl transition-transform duration-300 ${
            isOpen ? "rotate-180 text-white" : "text-dark-secondary"
          }`}
        />
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
        <p className="text-white pl-[2.625rem] text-xs sm:text-base">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default AccordionItem;
