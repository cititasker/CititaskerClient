import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { SubcategoryItem } from "./SubcategoryItem";

interface CategoryItemProps {
  category: {
    id: number;
    name: string;
    subcategories: Array<{ id: number; name: string }>;
  };
  isSelected: boolean;
  selectedSubcategories: Set<number>;
  onToggleCategory: (id: number) => void;
  onToggleSubcategory: (categoryId: number, subcategoryId: number) => void;
}

export function CategoryItem({
  category,
  isSelected,
  selectedSubcategories,
  onToggleCategory,
  onToggleSubcategory,
}: CategoryItemProps) {
  const selectedSubCount = category.subcategories.filter((sub) =>
    selectedSubcategories.has(sub.id)
  ).length;

  return (
    <AccordionItem value={category.id.toString()} className="border-none">
      <div className="flex items-center gap-3 py-2 md:px-3 rounded-lg hover:bg-gray-50 transition-colors">
        <Checkbox
          id={`category-${category.id}`}
          checked={isSelected}
          onCheckedChange={() => onToggleCategory(category.id)}
          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />

        <div className="flex-1">
          <AccordionTrigger className="text-sm font-medium text-gray-900 hover:no-underline py-0">
            <div className="flex items-center gap-2">
              <span>{category.name}</span>
              {selectedSubCount > 0 && (
                <Badge
                  variant="default"
                  className="h-5 w-5 flex items-center justify-center text-xs"
                >
                  {selectedSubCount}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
        </div>
      </div>

      <AccordionContent className="pb-2">
        <div className="ml-6 space-y-2 pt-2">
          {category.subcategories.map((subcategory) => (
            <SubcategoryItem
              key={subcategory.id}
              subcategory={subcategory}
              isSelected={selectedSubcategories.has(subcategory.id)}
              onToggle={() => onToggleSubcategory(category.id, subcategory.id)}
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
