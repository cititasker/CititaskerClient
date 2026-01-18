import { ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";

// Hook for managing filter drawer state
export const useFormFilterDrawer = (
  initialFilters: ColumnFiltersState = []
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<ColumnFiltersState>(initialFilters);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);
  const toggleDrawer = () => setIsOpen((prev) => !prev);

  const updateFilters = (newFilters: ColumnFiltersState) => {
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setFilters([]);
  };

  const addFilter = (id: string, value: any) => {
    setFilters((prev) => {
      const existing = prev.find((filter) => filter.id === id);
      if (existing) {
        return prev.map((filter) =>
          filter.id === id ? { ...filter, value } : filter
        );
      }
      return [...prev, { id, value }];
    });
  };

  const removeFilter = (id: string) => {
    setFilters((prev) => prev.filter((filter) => filter.id !== id));
  };

  return {
    // State
    isOpen,
    filters,

    // Actions
    openDrawer,
    closeDrawer,
    toggleDrawer,
    setIsOpen,

    // Filter management
    updateFilters,
    resetFilters,
    addFilter,
    removeFilter,

    // Computed
    hasActiveFilters: filters.length > 0,
    activeFiltersCount: filters.length,
  };
};
