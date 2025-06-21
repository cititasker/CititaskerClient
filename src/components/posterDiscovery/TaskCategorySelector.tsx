"use client";
import React, { useState } from "react";
import { categoryItems } from "../../../data";
import { cn } from "@/utils";

const TaskCategorySelector = () => {
  const [selected, setSelected] = useState("Cleaning");

  return (
    <main className="px-4 md:px-16 md:pb-20">
      <div>
        <h3 className="text-[20px] md:text-[24px] font-semibold pb-3">
          Get your to-dos done today
        </h3>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(126px,1fr))] gap-6">
        {categoryItems.map((item) => {
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
                  "w-9 h-9 mb-2 transition-colors",
                  isActive ? "text-white" : "text-black"
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
