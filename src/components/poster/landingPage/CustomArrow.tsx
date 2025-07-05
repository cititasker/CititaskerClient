"use client";
import { cn } from "@/utils";
import React from "react";
import { HiMiniChevronLeft, HiMiniChevronRight } from "react-icons/hi2";

interface IProps {
  dir?: "left" | "right";
  onClick?: () => void;
  extraClass?: string;
}
const CustomArrow = ({ dir = "left", onClick, extraClass }: IProps) => {
  return (
    <div
      className={cn(
        `z-[99] cursor-pointer select-none absolute rounded-full h-8 w-8 flex justify-center items-center bg-light-primary-1 ${
          dir == "left" ? "left-[2%]" : "right-[2%]"
        }`,
        extraClass
      )}
      onClick={onClick}
    >
      {dir === "left" ? (
        <HiMiniChevronLeft className="text-2xl text-primary" />
      ) : (
        <HiMiniChevronRight className="text-2xl text-primary" />
      )}
    </div>
  );
};

export default CustomArrow;
