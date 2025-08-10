import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface IProps {
  title?: string;
  desc?: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}
export default function Success({
  title,
  desc,
  children,
  action,
  className,
  contentClassName,
}: IProps) {
  return (
    <div
      className={cn(
        "w-full h-full my-auto flex flex-col min-h-[350px]",
        className
      )}
    >
      <div className={cn("mt-10", contentClassName)}>
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
      </div>
      {action && <div className="mt-auto">{action}</div>}
    </div>
  );
}
