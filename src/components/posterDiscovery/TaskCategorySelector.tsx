"use client";
import React, { useState } from "react";
import { cn } from "@/utils";

import {
  IBalloons,
  IBike,
  IBriefcase,
  IBroom,
  ICutlery,
  IMakeUpBrush,
  IUser,
} from "@/constant/icons";

const categories = [
  { icon: IBroom, label: "Cleaning" },
  { icon: ICutlery, label: "Cooking & Catering" },
  { icon: IBike, label: "Delivery" },
  { icon: IBalloons, label: "Event" },
  { icon: IUser, label: "Handyman" },
  { icon: IBriefcase, label: "Installation & Assembling" },
  { icon: IMakeUpBrush, label: "Fashion & Beauty" },
];

const TaskCategorySelector = () => {
  const [selected, setSelected] = useState("Cleaning");

  return (
    <main className="container-w md:pb-20">
      <div>
        <h3 className="text-[20px] md:text-[24px] font-semibold mb-3">
          Get your to-dos done today
        </h3>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(126px,1fr))] gap-3 sm:gap-6">
        {categories.map((item) => {
          const isActive = selected === item.label;
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              onClick={() => setSelected(item.label)}
              className={cn(
                "h-[126px] px-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm border transition-colors duration-200",
                isActive
                  ? "bg-primary text-white"
                  : "bg-white text-black border-gray-200"
              )}
            >
              <Icon
                className={cn(
                  "mb-2 transition-colors text-black-2 [&_path]:fill-black-2",
                  isActive && "text-white [&_path]:fill-white"
                )}
              />
              <p className="text-[16px] font-medium leading-tight">
                {item.label}
              </p>
            </button>
          );
        })}
      </div>
    </main>
  );
};

export default TaskCategorySelector;
