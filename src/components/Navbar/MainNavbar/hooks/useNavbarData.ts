"use client";
import { useMemo } from "react";
import { useGetCategories } from "@/services/general/index.hook";
import { capitalize } from "@/utils";
import { ROUTES } from "@/constant";
import { navbar } from "data";

export function useNavbarData() {
  const { data: categories = [], isPending } = useGetCategories();

  const navbarList = useMemo(
    () =>
      navbar.map((item) => {
        if (item.name === "Categories") {
          return {
            ...item,
            children: categories.map((cat) => ({
              category: capitalize(cat.name),
              href: `${ROUTES.BROWSE_TASK}?category_id=${cat.id}`,
              children: cat.subcategories.map((sub) => ({
                name: capitalize(sub.name),
                href: `${ROUTES.BROWSE_TASK}?sub_category_id=${sub.id}`,
              })),
            })),
          };
        }
        return item;
      }),
    [categories]
  );

  const categoryGroups =
    navbarList.find((item) => item.name === "Categories")?.children || [];

  return {
    navbarList,
    categoryGroups,
    isLoading: isPending,
  };
}
