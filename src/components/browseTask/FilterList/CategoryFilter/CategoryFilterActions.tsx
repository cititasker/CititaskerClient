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
          onClick={onClear}
          className="
            px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-600 
            hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800
            transition-all duration-200 ease-in-out
            focus:ring-2 focus:ring-gray-200 focus:ring-offset-2
            flex items-center gap-2 font-medium
          "
        >
          <RotateCcw size={16} />
          Reset
        </FormButton>
      )}
    </div>
  );
}
