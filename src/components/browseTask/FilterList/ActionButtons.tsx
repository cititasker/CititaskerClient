import React from "react";
import FormButton from "@/components/forms/FormButton";
import { Check, RotateCcw } from "lucide-react";

interface ActionButtonsProps {
  onReset: () => void;
  hasValues: boolean;
  disabled?: boolean;
}

export function ActionButtons({
  onReset,
  hasValues,
  disabled = false,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-3 pt-2">
      <FormButton
        type="submit"
        icon={<Check size={16} />}
        text="Apply"
        disabled={disabled}
        className={`
          flex-1
          transition-all duration-200 ease-in-out
          focus:ring-0 focus:ring-offset-2
          shadow-sm hover:shadow-md
        `}
      />

      {hasValues && (
        <FormButton
          type="button"
          icon={<RotateCcw size={16} />}
          text="Reset"
          onClick={onReset}
          className="flex-1 transition-all duration-200 ease-in-out focus:ring-0 focus:ring-gray-200 focus:ring-offset-2"
        />
      )}
    </div>
  );
}
