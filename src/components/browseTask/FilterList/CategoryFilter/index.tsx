"use client";
import React, { useMemo } from "react";
import { Accordion } from "@/components/ui/accordion";
import { useGetCategories } from "@/services/general/index.hook";
import { capitalize } from "@/utils";
import { useCategoryFilter } from "./hooks/useCategoryFilter";
import { Filter } from "lucide-react";
import { CategoryFilterSkeleton } from "./CategoryFilterSkeleton";
import { CategoryFilterActions } from "./CategoryFilterActions";
import { CategoryItem } from "./CategoryItem";

export default function CategoryFilter() {
  const { data = [], isPending } = useGetCategories();

  const categoryOptions = useMemo(
    () =>
      data.map((category) => ({
        id: category.id,
        name: capitalize(category.name),
        subcategories: category.subcategories.map((sub: any) => ({
          id: sub.id,
          name: capitalize(sub.name),
        })),
      })),
    [data]
  );

  const {
    selectedCategories,
    selectedSubcategories,
    toggleCategory,
    toggleSubcategory,
    updateUrl,
    clearFilters,
    hasSelection,
    selectedCount,
  } = useCategoryFilter(categoryOptions);

  if (isPending) {
    return (
      <div className="bg-white md:rounded-xl md:shadow-sm md:border border-gray-100 md:p-6">
        <div className="mb-3 md:mb-6">
          <div className="h-6 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
        <CategoryFilterSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-white md:rounded-xl md:shadow-sm md:border border-gray-100 md:p-4">
      <div className="mb-3 md:mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 flex items-center gap-2">
          Category Filter
        </h3>
        <p className="text-sm text-gray-500">
          Select categories and subcategories to filter tasks
        </p>
      </div>

      <div className="space-y-2">
        <Accordion collapsible type="single" className="space-y-2">
          {categoryOptions.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              isSelected={selectedCategories.has(category.id)}
              selectedSubcategories={selectedSubcategories}
              onToggleCategory={toggleCategory}
              onToggleSubcategory={toggleSubcategory}
            />
          ))}
        </Accordion>

        {categoryOptions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Filter className="mx-auto mb-2 opacity-50" size={24} />
            <p className="text-sm">No categories available</p>
          </div>
        )}
      </div>

      <CategoryFilterActions
        onApply={updateUrl}
        onClear={clearFilters}
        hasSelection={hasSelection}
        selectedCount={selectedCount}
      />
    </div>
  );
}
