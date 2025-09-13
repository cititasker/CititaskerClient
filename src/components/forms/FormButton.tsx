"use client";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import Link from "next/link";
import { BiLoader } from "react-icons/bi";
import React from "react";
interface FormButtonProps extends ButtonProps {
  text?: string;
  href?: string;
  target?: "_blank" | "_parent" | "_self" | "_top";
  loading?: boolean;
  handleClick?: () => void;
  icon?: React.ReactNode;
}

const FormButton: React.FC<FormButtonProps> = ({
  text = "Submit",
  className,
  loading = false,
  disabled = false,
  type = "button",
  href,
  target,
  children,
  icon,
  handleClick,
  variant = "default",
  size = "default",
  ...props
}) => {
  const content = (
    <>
      {loading && (
        <BiLoader size={20} className="animate-spin shrink-0 !w-5 !h-5" />
      )}
      {icon && !loading && <span>{icon}</span>}
      {children || text}
    </>
  );

  if (href) {
    return (
      <Button
        asChild
        variant={variant}
        size={size}
        className={cn(
          "w-fit px-5 flex items-center justify-center gap-2",
          className
        )}
        {...props}
      >
        <Link href={href} target={target}>
          {content}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      disabled={disabled || loading}
      onClick={handleClick}
      className={cn(
        "min-w-max flex items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      {content}
    </Button>
  );
};

export default FormButton;
