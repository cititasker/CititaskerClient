import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface CategoryData {
  id: number;
  name: string;
  subcategories: Array<{ id: number; name: string }>;
}

export function useCategoryFilter(categories: CategoryData[]) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<Set<number>>(
    new Set()
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState<
    Set<number>
  >(new Set());

  // Initialize from URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get("category_id");
    const subcategoryParam = searchParams.get("sub_category_id");

    if (categoryParam) {
      const categoryIds = categoryParam.split(",").map(Number).filter(Boolean);
      setSelectedCategories(new Set(categoryIds));

      // When categories are selected, select all their subcategories internally
      const allSubcategoryIds = categories
        .filter((cat) => categoryIds.includes(cat.id))
        .flatMap((cat) => cat.subcategories.map((sub) => sub.id));
      setSelectedSubcategories(new Set(allSubcategoryIds));
    } else if (subcategoryParam) {
      const subcategoryIds = subcategoryParam
        .split(",")
        .map(Number)
        .filter(Boolean);
      setSelectedSubcategories(new Set(subcategoryIds));
    }
  }, [searchParams, categories]);

  const toggleCategory = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return;

    const newCategories = new Set(selectedCategories);
    const newSubcategories = new Set(selectedSubcategories);

    if (newCategories.has(categoryId)) {
      // Unselect category and all its subcategories
      newCategories.delete(categoryId);
      category.subcategories.forEach((sub) => newSubcategories.delete(sub.id));
    } else {
      // Select category and all its subcategories
      newCategories.add(categoryId);
      category.subcategories.forEach((sub) => newSubcategories.add(sub.id));
    }

    setSelectedCategories(newCategories);
    setSelectedSubcategories(newSubcategories);
  };

  const toggleSubcategory = (categoryId: number, subcategoryId: number) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return;

    const newCategories = new Set(selectedCategories);
    const newSubcategories = new Set(selectedSubcategories);

    if (newSubcategories.has(subcategoryId)) {
      // Unselect subcategory
      newSubcategories.delete(subcategoryId);
      // Always unselect parent category when deselecting a subcategory
      newCategories.delete(categoryId);
    } else {
      // Select subcategory
      newSubcategories.add(subcategoryId);

      // Check if all subcategories are now selected
      const allSelected = category.subcategories.every(
        (sub) => sub.id === subcategoryId || newSubcategories.has(sub.id)
      );

      if (allSelected) {
        newCategories.add(categoryId);
      }
    }

    setSelectedCategories(newCategories);
    setSelectedSubcategories(newSubcategories);
  };

  // Compute what should actually be sent to the API
  const getFilterParams = useMemo(() => {
    const categoriesToSend: number[] = [];
    const subcategoriesToSend: number[] = [];

    // For each category, check if all subcategories are selected
    categories.forEach((category) => {
      const allSubsSelected = category.subcategories.every((sub) =>
        selectedSubcategories.has(sub.id)
      );

      if (allSubsSelected && category.subcategories.length > 0) {
        // Send category ID only
        categoriesToSend.push(category.id);
      } else {
        // Send only selected subcategories for this category
        category.subcategories.forEach((sub) => {
          if (selectedSubcategories.has(sub.id)) {
            subcategoriesToSend.push(sub.id);
          }
        });
      }
    });

    return { categoriesToSend, subcategoriesToSend };
  }, [categories, selectedSubcategories]);

  const updateUrl = () => {
    const current = new URLSearchParams(searchParams.toString());
    const { categoriesToSend, subcategoriesToSend } = getFilterParams;

    // Clear existing category filters
    current.delete("category_id");
    current.delete("sub_category_id");

    // Add category_id if we have full categories selected
    if (categoriesToSend.length > 0) {
      current.set("category_id", categoriesToSend.join(","));
    }

    // Add sub_category_id if we have partial selections
    if (subcategoriesToSend.length > 0) {
      current.set("sub_category_id", subcategoriesToSend.join(","));
    }

    // Preserve other query params
    router.push(`?${current.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    setSelectedCategories(new Set());
    setSelectedSubcategories(new Set());

    const current = new URLSearchParams(searchParams.toString());
    current.delete("category_id");
    current.delete("sub_category_id");
    router.push(`?${current.toString()}`, { scroll: false });
  };

  const hasSelection = selectedSubcategories.size > 0;

  const selectedCount = useMemo(() => {
    // Count unique selections: full categories + partial subcategories
    const { categoriesToSend, subcategoriesToSend } = getFilterParams;
    return categoriesToSend.length + subcategoriesToSend.length;
  }, [getFilterParams]);

  return {
    selectedCategories,
    selectedSubcategories,
    toggleCategory,
    toggleSubcategory,
    updateUrl,
    clearFilters,
    hasSelection,
    selectedCount,
  };
}
