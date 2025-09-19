import React, { useState } from "react";
import { Grid, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useCategoryFilter } from "../../hooks/useCategoryFilter";

interface CategorySectionProps {
  categoryGroups: any[];
  isLoading: boolean;
  onNavClick: () => void;
}

// Enhanced Search Input Component
const SearchInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}> = ({ value, onChange, placeholder = "Search categories..." }) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="pl-10 h-11 border-neutral-200 focus:border-primary-400 bg-neutral-50 focus:bg-white transition-colors"
    />
  </div>
);

// Empty State Component
const EmptyState: React.FC = () => (
  <div className="text-center py-8">
    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <Grid className="w-8 h-8 text-neutral-300" />
    </div>
    <h3 className="font-medium text-neutral-900 mb-1">No categories found</h3>
    <p className="text-neutral-500 text-sm">Try adjusting your search terms</p>
  </div>
);

// Loading State Component
const LoadingState: React.FC = () => (
  <div className="flex items-center justify-center py-8">
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 bg-primary-200 rounded-full animate-pulse" />
      <span className="text-neutral-500 text-sm">Loading categories...</span>
    </div>
  </div>
);

export const CategorySection: React.FC<CategorySectionProps> = ({
  categoryGroups,
  isLoading,
  onNavClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGroups = useCategoryFilter(categoryGroups, searchTerm);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border-b border-neutral-200"
    >
      {/* Main Category Header */}
      <CollapsibleTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-3 w-full p-4 transition-all duration-200 text-left",
            "hover:bg-primary-50 active:bg-primary-100",
            "focus:outline-none focus:bg-primary-50",
            isOpen && "bg-primary-50 text-primary-700"
          )}
        >
          <Grid className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">Categories</span>
          <ChevronDown
            className={cn(
              "w-4 h-4 ml-auto transition-transform duration-200 flex-shrink-0",
              isOpen && "rotate-180"
            )}
          />
        </button>
      </CollapsibleTrigger>

      {/* Category Content */}
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <div className="px-4 pb-6 pt-2 space-y-4">
          {/* Search Input */}
          <div className="pt-2">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search categories..."
            />
          </div>

          {/* Categories List */}
          {filteredGroups.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-3">
              <Accordion type="single" collapsible className="space-y-2">
                {filteredGroups.map((group, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`category-${idx}`}
                    className="border border-neutral-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="flex items-center gap-3 w-full px-4 py-3 bg-neutral-50 hover:bg-neutral-100 text-left hover:no-underline transition-colors data-[state=open]:bg-neutral-100">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        <span className="font-medium text-primary-700 text-sm">
                          {group.category}
                        </span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="bg-white">
                      <div className="py-1">
                        {group.children.map((item: any, i: number) => (
                          <Link
                            key={i}
                            href={item.href}
                            onClick={onNavClick}
                            className={cn(
                              "flex items-center px-6 py-3 text-sm transition-colors",
                              "text-neutral-700 hover:text-primary-600 hover:bg-primary-50",
                              "border-t border-neutral-100 first:border-t-0",
                              "focus:outline-none focus:bg-primary-50 focus:text-primary-600"
                            )}
                          >
                            <span className="truncate">{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Results Summary */}
              {searchTerm && (
                <div className="pt-2 pb-1 px-1">
                  <p className="text-xs text-neutral-500">
                    {filteredGroups.length} categor
                    {filteredGroups.length !== 1 ? "ies" : "y"} found
                    {searchTerm && ` for "${searchTerm}"`}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

// Alternative Simpler Version (if you prefer less nesting)
export const CategorySectionSimple: React.FC<CategorySectionProps> = ({
  categoryGroups,
  isLoading,
  onNavClick,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredGroups = useCategoryFilter(categoryGroups, searchTerm);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="border-b border-neutral-200">
      {/* Header */}
      <div className="p-4 bg-neutral-50/50 border-b border-neutral-100">
        <div className="flex items-center gap-3 mb-4">
          <Grid className="w-5 h-5 text-primary-600" />
          <h3 className="font-semibold text-neutral-900">Categories</h3>
        </div>

        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search categories..."
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {filteredGroups.length === 0 ? (
          <EmptyState />
        ) : (
          <Accordion type="single" collapsible className="space-y-3">
            {filteredGroups.map((group, idx) => (
              <AccordionItem
                key={idx}
                value={`category-${idx}`}
                className="border border-neutral-200 rounded-xl overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="flex items-center gap-3 px-4 py-3 bg-neutral-50 hover:bg-neutral-100 hover:no-underline text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="font-medium text-primary-700">
                      {group.category}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="bg-white">
                  {group.children.map((item: any, i: number) => (
                    <Link
                      key={i}
                      href={item.href}
                      onClick={onNavClick}
                      className={cn(
                        "block px-6 py-3 text-sm transition-colors",
                        "text-neutral-700 hover:text-primary-600 hover:bg-primary-50",
                        "border-t border-neutral-100 first:border-t-0"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
};
