"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const header: any = {
  1: "What task do you want to get done?",
  2: "What’s the location of this task?",
  3: "When do you want to get this task done?",
  4: "What is your budget for this task?",
};

const bar: any = {
  1: 10,
  2: 30,
  3: 55,
  4: 85,
};

const PostTaskHeader = () => {
  const searchParams = useSearchParams();
  const step = Number(searchParams.get("step")) || 1;

  return (
    <div className="flex gap-6 flex-col mb-6">
      <div>
        <p className="text-xl mb-2">{step} of 4</p>
        <div className="w-full h-[15px] bg-black rounded-[10px] overflow-hidden p-0.5">
          <div
            className={`transition-all duration-500 bg-light-primary-2 h-full rounded-[10px]`}
            style={{ width: `${bar[step]}%` }}
          ></div>
        </div>
      </div>
      <h2 className="text-[2rem] font-semibold text-black leading-normal">
        {header[step]}
      </h2>
    </div>
  );
};

export default PostTaskHeader;
