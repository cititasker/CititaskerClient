import { cn } from "@/utils";
import Link from "next/link";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";

const BackTo: React.FC<{
  href: string;
  text?: string;
  extraClass?: string;
}> = ({ href, text = "Back to website", extraClass }) => {
  return (
    <Link
      href={href}
      className={cn("flex items-center w-fit text-primary py-4", extraClass)}
    >
      <BsArrowLeft className="text-lg text-primary mr-2" />
      <span className="underline text-primary text-base inline-block">
        {text}
      </span>
    </Link>
  );
};

export default BackTo;
