import React from "react";
import FormButton from "@/components/forms/FormButton";
import { IFilterLines } from "@/constant/icons";
import { SearchBar } from "../../browseTask/SearchBar";

interface MyTaskHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isSearching: boolean;
  onOpenFilter: () => void;
}

export function MyTaskHeader({
  searchTerm,
  setSearchTerm,
  isSearching,
  onOpenFilter,
}: MyTaskHeaderProps) {
  return (
    <div className="flex items-center gap-3 justify-between">
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        isSearching={isSearching}
        placeholder="Search your tasks..."
      />

      <FormButton
        icon={<IFilterLines />}
        className="
          px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-700 
          font-medium text-sm hover:bg-gray-50 hover:border-gray-300
          transition-all duration-200 flex items-center gap-2 md:hidden
        "
        onClick={onOpenFilter}
      >
        Filters
      </FormButton>
    </div>
  );
}
