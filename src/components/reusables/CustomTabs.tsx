import React from "react";
import FormButton from "../forms/FormButton";

interface IProps {
  userType: string;
  handleTabToggle: (value: string) => void;
  extraStyle?: string;
}

const CustomTabs = ({ userType, handleTabToggle, extraStyle }: IProps) => {
  return (
    <div
      className={`mb-5 sm:mb-[2.75rem] mx-auto max-w-[30rem] w-full p-1 border border-primary rounded-[2.5rem] flex gap-x-2 relative ${extraStyle}`}
    >
      <div
        className={`h-[calc(100%-8px)] rounded-[40px] bg-primary absolute top-1 left-1 w-1/2 transition-transform duration-150 ${
          userType === "tasker" ? "translate-x-[calc(100%-0.5rem)]" : ""
        }`}
      ></div>
      <FormButton
        btnStyle={`!bg-transparent w-1/2 min-h-[2.5rem] sm:!min-h-[3.125rem] z-[2] flex-1 !text-xs sm:!text-base ${
          userType === "poster" ? "!text-white" : "!text-primary"
        }`}
        handleClick={() => handleTabToggle("poster")}
      >
        Join as a Poster
      </FormButton>
      <FormButton
        btnStyle={`bg-transparent w-1/2 min-h-[2.5rem] sm:!min-h-[3.125rem] z-[2] flex-1 !text-xs sm:!text-base ${
          userType === "tasker" ? "!text-white" : "!text-primary"
        }`}
        handleClick={() => handleTabToggle("tasker")}
      >
        Join as a Tasker
      </FormButton>
    </div>
  );
};

export default CustomTabs;
