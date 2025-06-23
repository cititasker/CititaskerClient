import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface IProps {
  title?: string;
  desc?: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}
export default function Success({
  title,
  desc,
  children,
  action,
  className,
}: IProps) {
  return (
    <div className={cn("w-full h-full my-auto", className)}>
      <div className="w-full">
        <Image
          src="/icons/check_circle.svg"
          alt="success"
          width={80}
          height={80}
          className="mx-auto"
        />
      </div>
      {children ?? (
        <div className="mt-5">
          <p className="text-2xl text-center font-semibold text-black-2">
            {title}
          </p>
          <p className="text-center text-wrap mt-4 text-base font-normal">
            {desc}
          </p>
        </div>
      )}
      {action}
    </div>
  );
}
