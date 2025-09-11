"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useGetCategories } from "@/services/general/index.hook";
import { ROUTES } from "@/constant";
import {
  Search,
  Wrench,
  Car,
  Monitor,
  HardHat,
  Sparkles,
  Truck,
  Package,
  PartyPopper,
  ChefHat,
  Home,
  Scissors,
  GraduationCap,
  Heart,
  AlertCircle,
} from "lucide-react";
import { SubcategoryModal } from "./SubcategoryModal";
import { CategoryCard } from "./CategoryCard";
import { LoadingGrid } from "./LoadingGrid";
import { CategorySearch } from "./CategorySearch";

// Icon mapping
const CATEGORY_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "ASSEMBLING & INSTALLATION": Wrench,
  "AUTOMOBILE AND BICYCLE": Car,
  "TELEPHONE, COMPUTER and IT": Monitor,
  "BUILDING AND CONSTRUCTION": HardHat,
  CLEANING: Sparkles,
  "MOVING SERVICE": Truck,
  DELIVERY: Package,
  EVENT: PartyPopper,
  HANDYMAN: Wrench,
  "COOKING & CATERING": ChefHat,
  "INTERIOR DESIGN": Home,
  "FASHION & BEAUTY": Scissors,
  "COACHING & TUTORING": GraduationCap,
  LIFESTYLE: Heart,
};

// Utilities
const formatName = (name: string) =>
  name.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());

const getIcon = (name: string) => CATEGORY_ICONS[name] || Wrench;

const TaskCategorySelector = () => {
  const router = useRouter();
  const { data: categories = [], isLoading, error } = useGetCategories();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ITaskCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter categories based on search
  const filteredCategories = useMemo(
    () =>
      categories.filter(
        (category) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.subcategories?.some((sub) =>
            sub.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
      ),
    [categories, searchTerm]
  );

  const handleCategoryClick = (category: ITaskCategory) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleCreateTask = (categoryId: number, subCategoryId?: number) => {
    const baseUrl = `${ROUTES.POST_TASK}?category_id=${categoryId}`;
    const url = subCategoryId
      ? `${baseUrl}&sub_category_id=${subCategoryId}`
      : baseUrl;
    router.push(url);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  if (error) {
    return (
      <section className="container-w pb-8 md:pb-16">
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-error mx-auto mb-3" />
          <h3 className="font-semibold text-text-primary mb-1">
            Unable to load categories
          </h3>
          <p className="text-sm text-text-secondary">
            Please refresh the page and try again
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container-w pb-8 md:pb-16">
      {/* Header */}
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          What do you need help with?
        </h2>
        <p className="text-text-secondary">
          Search or browse categories to create your task
        </p>
      </div>

      {/* Search */}
      <CategorySearch
        value={searchTerm}
        onChange={setSearchTerm}
        onClear={() => setSearchTerm("")}
      />

      {/* Categories */}
      {isLoading ? (
        <LoadingGrid />
      ) : filteredCategories.length === 0 ? (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-text-muted mx-auto mb-3" />
          <h3 className="font-medium text-text-primary mb-1">
            No categories found
          </h3>
          <p className="text-sm text-text-secondary">
            Try a different search term or browse all categories
          </p>
          <button
            onClick={() => setSearchTerm("")}
            className="mt-3 text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
          {filteredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => handleCategoryClick(category)}
              getIcon={getIcon}
              formatName={formatName}
            />
          ))}
        </div>
      )}

      {/* Subcategory Modal */}
      <SubcategoryModal
        category={selectedCategory}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onCreateTask={handleCreateTask}
        getIcon={getIcon}
        formatName={formatName}
      />
    </section>
  );
};

export default TaskCategorySelector;
