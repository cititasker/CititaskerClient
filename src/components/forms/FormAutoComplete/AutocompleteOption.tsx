import React from "react";
import { CommandItem } from "@/components/ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface AutocompleteOptionProps<TOption> {
  option: TOption;
  isSelected: boolean;
  onSelect: (option: TOption) => void;
  getOptionLabel: (option: TOption) => string;
  getOptionValue?: (option: TOption) => string | number;
  renderOption?: (
    props: any,
    option: TOption,
    selected: boolean
  ) => React.ReactNode;
  size?: "sm" | "md" | "lg";
  index: number;
}

const SIZE_CONFIG = {
  sm: { option: "px-3 py-2 text-sm" },
  md: { option: "px-4 py-3 text-sm" },
  lg: { option: "px-5 py-4 text-base" },
} as const;

export function AutocompleteOption<TOption>({
  option,
  isSelected,
  onSelect,
  getOptionLabel,
  getOptionValue,
  renderOption,
  size = "md",
  index,
}: AutocompleteOptionProps<TOption>) {
  const sizeConfig = SIZE_CONFIG[size];
  const optionLabel = getOptionLabel(option);
  const optionValue = getOptionValue ? getOptionValue(option) : optionLabel;

  return (
    <CommandItem
      key={`${optionValue}-${index}`}
      value={optionLabel}
      onSelect={() => onSelect(option)}
      className={cn(
        "flex items-center justify-between cursor-pointer transition-colors duration-150 rounded-none",
        "hover:bg-neutral-50 text-text-primary",
        sizeConfig.option,
        isSelected && "bg-primary-50 text-primary-700 hover:bg-primary-50"
      )}
    >
      <div className="flex-1 min-w-0">
        {renderOption ? (
          renderOption({ className: "w-full" }, option, isSelected)
        ) : (
          <span className="truncate">{optionLabel}</span>
        )}
      </div>

      {isSelected && (
        <Check className="h-4 w-4 text-primary flex-shrink-0 ml-3" />
      )}
    </CommandItem>
  );
}
