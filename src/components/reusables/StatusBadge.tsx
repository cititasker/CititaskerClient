import { cn } from "@/utils";
import React from "react";

interface IProps {
  text?: string;
  className?: string;
}
const StatusBadge = ({ text = "Open", className }: IProps) => {
  return (
    <div
      className={cn(
        "px-2.5 py-[5px] rounded-full text-xs font-normal text-white bg-primary cursor-default",
        className
      )}
    >
      {text}
    </div>
  );
};

export default StatusBadge;
