import { cn } from "@/utils";
import Image from "next/image";
import React from "react";
interface IProps {
  text: string;
  extraStyle?: string;
  lineStyle?: string;
}
const UnderlinedHeader = ({ text, extraStyle, lineStyle }: IProps) => {
  return (
    <span className={cn("inline-block relative w-fit", extraStyle)}>
      {text}
      <Image
        src="/images/underline.svg"
        alt=""
        width={28}
        height={4}
        className={cn(
          "absolute top-[75%] sm:top-[85%] w-full rotate-1",
          lineStyle
        )}
      />
    </span>
  );
};

export default UnderlinedHeader;
