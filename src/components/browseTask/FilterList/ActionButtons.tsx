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
        disabled={disabled}
        className={`
          flex-1 font-medium py-3 px-6 rounded-lg
          transition-all duration-200 ease-in-out
          focus:ring-2 focus:ring-offset-2
          shadow-sm hover:shadow-md
          flex items-center justify-center gap-2
          ${
            !disabled // ✅ Enabled styling when NOT disabled
              ? "bg-primary hover:bg-primary/90 text-white focus:ring-primary/20"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }
        `}
      >
        <Check size={16} />
        Apply
      </FormButton>

      {hasValues && (
        <FormButton
          type="button"
          onClick={onReset}
          className="px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 flex items-center gap-2 font-medium"
        >
          <RotateCcw size={16} />
          Reset
        </FormButton>
      )}
    </div>
  );
}
