"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingMessageProps {
  message?: string;
  icon?: React.ReactNode;
  className?: string;
  textClassName?: string;
}

const LoadingMessage: React.FC<LoadingMessageProps> = ({
  message = "Loading...",
  icon = <Loader2 className="w-5 h-5 animate-spin" />,
  className = "",
  textClassName = "text-sm text-gray-600",
}) => {
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className="flex items-center gap-2">
        {icon}
        <span className={textClassName}>{message}</span>
      </div>
    </div>
  );
};

export default LoadingMessage;
