"use client";
import Image from "next/image";
import React from "react";
import Stats from "@/../public/images/tasker_stats.svg";
import { cn } from "@/utils";

interface IProps {
  extraClass?: string;
}
const TaskerStats = ({ extraClass }: IProps) => {
  return (
    <Image
      src={Stats}
      alt=""
      width={206}
      height={30}
      className={cn(
        "max-w-[6.75rem] sm:max-w-[12.875rem] w-full h-auto object-contain hover:scale-[1.15] transition-transform duration-300",
        extraClass
      )}
    />
  );
};

export default TaskerStats;
