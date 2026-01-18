import { useMemo } from "react";

export const useCategoryFilter = (
  categoryGroups: any[],
  searchTerm: string
) => {
  return useMemo(() => {
    if (!searchTerm.trim()) return categoryGroups;

    return categoryGroups.filter((group) => {
      const categoryMatch = group.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const hasMatchingChild = group.children.some((child: any) =>
        child.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return categoryMatch || hasMatchingChild;
    });
  }, [categoryGroups, searchTerm]);
};
