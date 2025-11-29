"use client";

import React from "react";
import { ButtonProps } from "@/components/ui/button";
import { Save } from "lucide-react";
import FormButton from "../forms/FormButton";

interface SaveButtonProps extends ButtonProps {
  hasChanges?: boolean;
  isLoading?: boolean;
  onClick: () => void;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  sticky?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  hasChanges = true,
  isLoading = false,
  onClick,
  label = "Save",
  icon = <Save className="w-4 h-4 mr-2" />,
  className = "",
  sticky = false,
  ...rest
}) => {
  if (!hasChanges) return null;

  return (
    <div className={`${sticky ? "sticky top-4 z-10" : ""} flex justify-end`}>
      <FormButton
        onClick={onClick}
        disabled={isLoading}
        className={`btn-primary shadow-lg ${className}`}
        {...rest}
        loading={isLoading}
        icon={icon}
      >
        {label}
      </FormButton>
    </div>
  );
};

export default SaveButton;
