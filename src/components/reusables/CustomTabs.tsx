"use client";

import React from "react";
import FormButton from "../forms/FormButton";
import { ROLE } from "@/constant";
import { cn } from "@/lib/utils";

interface IProps {
  userType: string;
  handleTabToggle: (value: TRole) => void;
  extraStyle?: string;
}

const tabs = [
  { label: "Join as a Poster", value: ROLE.poster },
  { label: "Join as a Tasker", value: ROLE.tasker },
];

const CustomTabs = ({ userType, handleTabToggle, extraStyle }: IProps) => {
  const activeIndex = tabs.findIndex((tab) => tab.value === userType);

  return (
    <div
      className={cn(
        "mb-5 sm:mb-[2.75rem] mx-auto max-w-[30rem] w-full p-1 border border-primary rounded-[2.5rem] flex gap-x-2 relative",
        extraStyle
      )}
    >
      {/* Background indicator */}
      <div
        className="h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-[40px] bg-primary absolute top-1 transition-transform duration-150"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />

      {tabs.map((tab) => (
        <FormButton
          key={tab.value}
          className={cn(
            "bg-transparent w-1/2 z-[2] flex-1 font-medium",
            userType === tab.value ? "text-white" : "text-primary"
          )}
          handleClick={() => handleTabToggle(tab.value)}
        >
          {tab.label}
        </FormButton>
      ))}
    </div>
  );
};

export default CustomTabs;
