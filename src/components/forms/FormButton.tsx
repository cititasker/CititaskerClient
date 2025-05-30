"use client";
import { cn } from "@/utils";
import Link from "next/link";
import React from "react";
import { BiLoader } from "react-icons/bi";

interface IProps {
  text?: string;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  type?: "submit" | "button";
  target?: "_blank" | "_parent" | "_self" | "_top";
  href?: string;
  children?: React.ReactNode;
  handleClick?: () => void;
}

const FormButton = ({
  text = "Submit",
  className,
  loading,
  disabled,
  type = "button",
  target,
  href,
  children,
  handleClick,
}: IProps) => {
  if (href)
    return (
      <Link
        href={href}
        target={target}
        className={cn(
          "min-w-max h-12 rounded-full transition-all duration-300 whitespace-nowrap px-5 text-base font-normal inline-flex justify-center cursor-pointer gap-3 w-fit bg-primary text-white items-center leading-normal",
          className
        )}
      >
        {children ? children : text}
      </Link>
    );
  else
    return (
      <button
        type={type}
        disabled={disabled || loading}
        className={cn(
          "min-w-max h-12 rounded-full transition-all duration-300 disabled:cursor-not-allowed disabled:bg-primary/70 px-5 text-base font-normal flex justify-center cursor-pointer gap-3 w-fit bg-primary text-white items-center leading-normal",
          className
        )}
        onClick={handleClick}
      >
        {loading && <BiLoader size={20} className="animate-spin" />}
        {children ? children : text}
      </button>
    );
};

export default FormButton;
