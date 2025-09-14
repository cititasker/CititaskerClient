import React from "react";
import FormButton from "@/components/forms/FormButton";
import { Check, RotateCcw, Filter } from "lucide-react";

interface CategoryFilterActionsProps {
  onApply: () => void;
  onClear: () => void;
  hasSelection: boolean;
  selectedCount: number;
}

export function CategoryFilterActions({
  onApply,
  onClear,
  hasSelection,
  selectedCount,
}: CategoryFilterActionsProps) {
  return (
    <div className="flex gap-3 pt-4 border-t border-gray-100 mt-4">
      <FormButton
        type="button"
        onClick={onApply}
        className="
          flex-1 bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg
          transition-all duration-200 ease-in-out
          focus:ring-2 focus:ring-primary/20 focus:ring-offset-2
          shadow-sm hover:shadow-md
          flex items-center justify-center gap-2
        "
      >
        <Check size={16} />
        Apply
        {selectedCount > 0 && (
          <span className="ml-1 bg-white/20 px-2 py-0.5 rounded-full text-xs">
            {selectedCount}
          </span>
        )}
      </FormButton>

      {hasSelection && (
        <FormButton
          type="button"
          icon={<RotateCcw size={16} />}
          text="Reset"
          onClick={onClear}
          className="
            transition-all duration-200 ease-in-out
            focus:ring-2 focus:ring-gray-200 focus:ring-offset-2
            flex items-center gap-2 font-medium
          "
        />
      )}
    </div>
  );
}
