"use client";

import Link from "next/link";
import { ROUTES } from "@/constant";
import CategoryDropdown from "../CategoryDropdown";
import clsx from "clsx";
import { NavItem } from "./nav";
import HowItWorksDropdown from "./HowItWorksDropdown";
import { navbar } from "../../../data";

interface Props {
  isAuth: boolean;
  path: string;
  user: Partial<IUser>;
}

export default function DesktopNav({ isAuth, path, user }: Props) {
  const isPoster = user?.role === "poster";

  console.log(44, user);

  return (
    <ul className="hidden lg:flex items-center gap-4">
      {navbar.map((nav: NavItem, index) => {
        if (nav.name === "Browse Tasks" && isPoster) return null;

        return nav.children ? (
          <CategoryDropdown key={index} nav={nav} />
        ) : (
          <li key={index}>
            <Link
              href={nav.href}
              className={clsx(
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
            className={clsx(
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
