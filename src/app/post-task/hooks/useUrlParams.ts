import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

export const useUrlParams = () => {
  const searchParams = useSearchParams();

  return useMemo(
    () => ({
      step: Number(searchParams.get("step")) || 1,
      todo: searchParams.get("todo"),
      categoryId: searchParams.get("category_id")
        ? Number(searchParams.get("category_id"))
        : null,
      subCategoryId: searchParams.get("sub_category_id")
        ? Number(searchParams.get("sub_category_id"))
        : null,
      action: searchParams.get("action"),
    }),
    [searchParams]
  );
};
