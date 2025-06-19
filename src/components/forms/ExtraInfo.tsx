"use client";

import { cn } from "@/lib/utils";
import Icons from "@/components/Icons";
import { HTMLAttributes } from "react";

interface ExtraInfoProps extends HTMLAttributes<HTMLDivElement> {
  children: string;
}

const ExtraInfo = ({ className, children, ...props }: ExtraInfoProps) => {
  return (
    <div
      className={cn(
        "p-4 sm:px-10 sm:py-[30px] bg-light-primary-1 rounded-[10px]",
        className
      )}
      {...props}
    >
      <div className="flex gap-5">
        <Icons.info className="w-[25px] h-[25px] flex-shrink-0 text-primary" />
        <p className="text-black-2 text-sm sm:text-base font-normal">
          {children}
        </p>
      </div>
    </div>
  );
};

export default ExtraInfo;
