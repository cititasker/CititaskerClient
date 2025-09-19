import React, { useState } from "react";
import { Grid, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SearchInput } from "./SearchInput";
import { useCategoryFilter } from "../../hooks/useCategoryFilter";

interface CategorySectionProps {
  categoryGroups: any[];
  isLoading: boolean;
  onNavClick: () => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  categoryGroups,
  isLoading,
  onNavClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const filteredGroups = useCategoryFilter(categoryGroups, searchTerm);

  const toggleCategory = (categoryIndex: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryIndex)) {
      newExpanded.delete(categoryIndex);
    } else {
      newExpanded.add(categoryIndex);
    }
    setExpandedCategories(newExpanded);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-neutral-500 text-sm">Loading categories...</div>
      </div>
    );
  }

  return (
    <div className="border-b border-neutral-200">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-3 w-full p-4 transition-all duration-200",
          "hover:bg-primary-50 active:bg-primary-100",
          isOpen && "bg-primary-50 text-primary-700"
        )}
      >
        <Grid className="w-5 h-5" />
        <span className="font-medium">Categories</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 ml-auto transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Content */}
      {isOpen && (
        <div className="px-4 pb-4 space-y-4 mt-4`">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search categories..."
          />

          {filteredGroups.length === 0 ? (
            <div className="text-center py-8">
              <Grid className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-500 text-sm">No categories found</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredGroups.map((group, idx) => (
                <div
                  key={idx}
                  className="border border-neutral-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleCategory(`category-${idx}`)}
                    className="flex items-center gap-3 w-full p-3 bg-neutral-50 hover:bg-neutral-100 transition-colors"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="font-medium text-primary-700 text-sm">
                      {group.category}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 ml-auto text-neutral-400 transition-transform duration-200",
                        expandedCategories.has(`category-${idx}`) &&
                          "rotate-180"
                      )}
                    />
                  </button>

                  {expandedCategories.has(`category-${idx}`) && (
                    <div className="bg-white">
                      {group.children.map((item: any, i: number) => (
                        <Link
                          key={i}
                          href={item.href}
                          onClick={onNavClick}
                          className="block px-6 py-3 text-sm text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-colors border-t border-neutral-100 first:border-t-0"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
