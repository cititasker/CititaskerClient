import Link from "next/link";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { cn } from "@/utils";

interface BackToProps {
  href: string;
  text?: string;
  className?: string;
}

const BackTo: React.FC<BackToProps> = ({
  href,
  text = "Back to website",
  className,
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-primary hover:text-primary-600 transition-colors duration-200",
        className
      )}
    >
      <BsArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform duration-200" />
      <span className="text-sm font-medium underline underline-offset-2">
        {text}
      </span>
    </Link>
  );
};

export default BackTo;
