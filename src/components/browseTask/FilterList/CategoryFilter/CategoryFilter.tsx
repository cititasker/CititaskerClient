import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { categoryOptions } from "./data";
import FormButton from "@/components/forms/FormButton";

export type Subcategory = {
  id: number;
  name: string;
  slug: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  subcategories: Subcategory[];
};

const CategoryFilter = () => {
  const [selectedCategories, setSelectedCategories] = useState<Set<number>>(
    new Set()
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState<
    Set<number>
  >(new Set());

  // Toggle entire category and all its subcategories
  const toggleCategory = (category: Category, checked: boolean) => {
    const newSelectedCategories = new Set(selectedCategories);
    const newSelectedSubcategories = new Set(selectedSubcategories);

    if (checked) {
      newSelectedCategories.add(category.id);
      category.subcategories.forEach((sub) =>
        newSelectedSubcategories.add(sub.id)
      );
    } else {
      newSelectedCategories.delete(category.id);
      category.subcategories.forEach((sub) =>
        newSelectedSubcategories.delete(sub.id)
      );
    }

    setSelectedCategories(newSelectedCategories);
    setSelectedSubcategories(newSelectedSubcategories);
  };

  // Toggle individual subcategory
  const toggleSubcategory = (
    category: Category,
    subcategory: Subcategory,
    checked: boolean
  ) => {
    const newSelectedSubcategories = new Set(selectedSubcategories);
    const newSelectedCategories = new Set(selectedCategories);

    if (checked) {
      newSelectedSubcategories.add(subcategory.id);
      // Check if all subcategories selected → select category
      const allSelected = category.subcategories.every((sub) =>
        sub.id === subcategory.id ? true : newSelectedSubcategories.has(sub.id)
      );
      if (allSelected) {
        newSelectedCategories.add(category.id);
      }
    } else {
      newSelectedSubcategories.delete(subcategory.id);
      newSelectedCategories.delete(category.id);
    }

    setSelectedSubcategories(newSelectedSubcategories);
    setSelectedCategories(newSelectedCategories);
  };

  // Submit handler logs selected data
  const handleSubmit = () => {
    const selectedData = categoryOptions
      .filter((category) => selectedCategories.has(category.id))
      .map((category) => ({
        category: category.id,
        subcategories: category.subcategories
          .filter((sub) => selectedSubcategories.has(sub.id))
          .map((sub) => sub.id),
      }));

    console.log("Selected Categories and Subcategories:", selectedData);
  };

  // Clear all selections
  const handleReset = () => {
    setSelectedCategories(new Set());
    setSelectedSubcategories(new Set());
  };

  // Check if any selection exists
  const hasSelection =
    selectedCategories.size > 0 || selectedSubcategories.size > 0;

  return (
    <div className="flex flex-col gap-2 py-2">
      <Accordion collapsible type="single">
        {categoryOptions.map((category) => {
          const isCategorySelected = selectedCategories.has(category.id);
          return (
            <AccordionItem key={category.id} value={category.slug}>
              <div className="flex items-center gap-3 w-full">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={isCategorySelected}
                  onCheckedChange={(checked) =>
                    toggleCategory(category, Boolean(checked))
                  }
                />
                <div className="flex-1">
                  <AccordionTrigger className="text-sm tracking-sm leading-none text-default capitalize">
                    {category.name}
                  </AccordionTrigger>
                </div>
              </div>
              <AccordionContent className="pl-2">
                <div className="flex flex-col gap-2">
                  {category.subcategories.map((sub) => {
                    const isSubSelected = selectedSubcategories.has(sub.id);
                    return (
                      <div
                        key={sub.id}
                        className="flex items-center gap-3 w-full"
                      >
                        <Checkbox
                          id={`subcategory-${sub.id}`}
                          checked={isSubSelected}
                          onCheckedChange={(checked) =>
                            toggleSubcategory(category, sub, Boolean(checked))
                          }
                        />
                        <Label
                          htmlFor={`subcategory-${sub.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {sub.name}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      <div className="flex gap-3 ml-auto w-fit mt-4">
        <FormButton
          variant="nude"
          text="Apply"
          size="lg"
          className="font-medium text-primary p-0 h-fit"
          onClick={handleSubmit}
        />
        {hasSelection && (
          <FormButton
            variant="destructive"
            text="Clear"
            size="lg"
            className="font-medium text-destructive bg-transparent p-0 h-fit"
            onClick={handleReset}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
