import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

export function useSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize from URL
  const [searchTerm, setSearchTerm] = useState(
    () => searchParams.get("search") || ""
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Update URL when debounced search term changes
  useEffect(() => {
    const current = new URLSearchParams(searchParams.toString());

    if (debouncedSearchTerm.trim()) {
      current.set("search", debouncedSearchTerm);
    } else {
      current.delete("search");
    }

    // Only push to router if the URL actually changed
    const newUrl = `?${current.toString()}`;
    const currentUrl = `?${searchParams.toString()}`;

    if (newUrl !== currentUrl) {
      router.push(newUrl, { scroll: false });
    }
  }, [debouncedSearchTerm, router, searchParams]);

  // Sync state with URL changes
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    if (urlSearch !== searchTerm) {
      setSearchTerm(urlSearch);
    }
  }, [searchParams]);

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    isSearching: searchTerm !== debouncedSearchTerm,
  };
}
