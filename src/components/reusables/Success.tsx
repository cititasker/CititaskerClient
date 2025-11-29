import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
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
    <div className={cn("text-center space-y-6 pt-8", className)}>
      <div className="mx-auto w-20 h-20 bg-success-light rounded-full flex items-center justify-center">
        <CheckCircle className="w-10 h-10 text-success" />
      </div>

      {children ?? (
        <div className="space-y-3 pb-8">
          <h3 className="text-2xl font-bold text-neutral-900">{title}</h3>
          <p className="text-neutral-600 max-w-md mx-auto">{desc}</p>
        </div>
      )}

      {action && <div className="mt-auto">{action}</div>}
    </div>
  );
}
