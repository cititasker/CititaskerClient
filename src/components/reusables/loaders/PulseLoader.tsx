import { cn } from "@/lib/utils";
import React from "react";

interface IProps {
  className?: string;
}
const PulseLoader = ({ className }: IProps) => (
  <div className={cn("absolute top-10 left-10 z-50", className)}>
    <div className="w-4 h-4 bg-primary rounded-full animate-ping" />
  </div>
);

export default PulseLoader;
