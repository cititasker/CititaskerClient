import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SubcategoryItemProps {
  subcategory: { id: number; name: string };
  isSelected: boolean;
  onToggle: () => void;
}

export function SubcategoryItem({
  subcategory,
  isSelected,
  onToggle,
}: SubcategoryItemProps) {
  return (
    <div className="flex items-center gap-3 py-1.5 px-3 rounded-md hover:bg-gray-50 transition-colors">
      <Checkbox
        id={`subcategory-${subcategory.id}`}
        checked={isSelected}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
      <Label
        htmlFor={`subcategory-${subcategory.id}`}
        className="text-sm text-gray-700 cursor-pointer flex-1"
      >
        {subcategory.name}
      </Label>
    </div>
  );
}
