import React from "react";
import FormButton from "@/components/forms/FormButton";
import { SearchBar } from "../../browseTask/SearchBar";
import { Funnel } from "lucide-react";

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
        icon={<Funnel />}
        className="!px-4 xl:hidden"
        text="Filters"
        onClick={onOpenFilter}
      />
    </div>
  );
}
