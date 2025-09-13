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
    const categoryParam = searchParams.get("categories");
    const subcategoryParam = searchParams.get("subcategories");

    if (categoryParam) {
      const categoryIds = categoryParam.split(",").map(Number).filter(Boolean);
      setSelectedCategories(new Set(categoryIds));
    }

    if (subcategoryParam) {
      const subcategoryIds = subcategoryParam
        .split(",")
        .map(Number)
        .filter(Boolean);
      setSelectedSubcategories(new Set(subcategoryIds));
    }
  }, [searchParams]);

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

  const updateUrl = () => {
    const current = new URLSearchParams(searchParams.toString());

    if (selectedCategories.size > 0) {
      current.set("categories", Array.from(selectedCategories).join(","));
    } else {
      current.delete("categories");
    }

    if (selectedSubcategories.size > 0) {
      current.set("subcategories", Array.from(selectedSubcategories).join(","));
    } else {
      current.delete("subcategories");
    }

    router.push(`?${current.toString()}`);
  };

  const clearFilters = () => {
    setSelectedCategories(new Set());
    setSelectedSubcategories(new Set());

    const current = new URLSearchParams(searchParams.toString());
    current.delete("categories");
    current.delete("subcategories");
    router.push(`?${current.toString()}`);
  };

  const hasSelection =
    selectedCategories.size > 0 || selectedSubcategories.size > 0;

  const selectedCount = useMemo(() => {
    return selectedCategories.size + selectedSubcategories.size;
  }, [selectedCategories.size, selectedSubcategories.size]);

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
