import { useMemo } from "react";
import { capitalize } from "@/utils";
import {
  useGetCategories,
  useGetSubCategories,
} from "@/services/general/index.hook";

export const useCategoryOptions = (categoryId: number | null) => {
  const { data: rawCategories = [] } = useGetCategories();
  const { data: rawSubCategories = [] } = useGetSubCategories({
    id: categoryId,
  });

  const categories = useMemo(
    () => rawCategories.map((c) => ({ ...c, name: capitalize(c.name) })),
    [rawCategories]
  );

  const subCategories = useMemo(
    () => rawSubCategories.map((s) => ({ ...s, name: capitalize(s.name) })),
    [rawSubCategories]
  );

  return { categories, subCategories };
};
