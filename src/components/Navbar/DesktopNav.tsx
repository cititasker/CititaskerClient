"use client";

import Link from "next/link";
import { ROUTES } from "@/constant";
import CategoryDropdown from "../CategoryDropdown";
import HowItWorksDropdown from "./HowItWorksDropdown";
import { navbar } from "data";
import { cn } from "@/lib/utils";
import { useGetCategories } from "@/services/general/index.hook";
import { useMemo } from "react";
import { capitalize } from "@/utils";

interface Props {
  isAuth: boolean;
  path: string;
  user: Partial<IUser>;
}

export default function DesktopNav({ isAuth, path, user }: Props) {
  const isPoster = user?.role === "poster";

  const { data = [] } = useGetCategories();

  const navbarList = useMemo(
    () =>
      navbar.map((el) => {
        if (el.name === "Categories") {
          return {
            ...el,
            children: data.map((cat) => ({
              category: capitalize(cat.name),
              children: cat.subcategories.map((sub) => ({
                name: capitalize(sub.name),
                href: `${ROUTES.BROWSE_TASK}?sub_category_id=${sub.id}`,
              })),
            })),
          };
        }
        return el;
      }),
    [data]
  );

  return (
    <ul className="hidden lg:flex items-center gap-4">
      {navbarList.map((nav, index) => {
        if (nav.name === "Browse Tasks" && isPoster) return null;

        return nav.children ? (
          <CategoryDropdown key={index} nav={nav} />
        ) : (
          <li key={index}>
            <Link
              href={nav.href}
              className={cn(
                "text-base font-normal px-3 py-2 hover:text-primary",
                {
                  "border-b-2 border-primary": path === nav.href,
                }
              )}
            >
              {nav.name}
            </Link>
          </li>
        );
      })}

      {isAuth && user?.role && (
        <li>
          <Link
            href={`/${user.role}${ROUTES.MY_TASKS}`}
            className={cn(
              "text-base font-normal px-3 py-2 hover:text-primary",
              {
                "border-b-2 border-primary": path.includes("/my-tasks"),
              }
            )}
          >
            My Tasks
          </Link>
        </li>
      )}
      <HowItWorksDropdown />
    </ul>
  );
}
