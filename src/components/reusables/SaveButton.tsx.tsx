"use client";

import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Save } from "lucide-react";

interface SaveButtonProps extends ButtonProps {
  hasChanges?: boolean;
  isLoading?: boolean;
  onClick: () => void;
  label?: string;
  loadingLabel?: string;
  icon?: React.ReactNode;
  className?: string;
  sticky?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  hasChanges = true,
  isLoading = false,
  onClick,
  label = "Save",
  loadingLabel = "Saving...",
  icon = <Save className="w-4 h-4 mr-2" />,
  className = "",
  sticky = true,
  ...rest
}) => {
  if (!hasChanges) return null;

  return (
    <div
      className={`${sticky ? "sticky top-4 z-10" : ""} flex justify-end mb-6`}
    >
      <Button
        onClick={onClick}
        disabled={isLoading}
        className={`btn-primary shadow-lg ${className}`}
        {...rest}
      >
        {isLoading ? (
          <span className="ml-2">{loadingLabel}</span>
        ) : (
          <>
            {icon}
            {label}
          </>
        )}
      </Button>
    </div>
  );
};

export default SaveButton;
