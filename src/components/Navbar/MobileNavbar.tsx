import React from "react";
import Link from "next/link";
import { navbar } from "../../../data";
import FormButton from "../forms/FormButton";
import MobileAccordionNav from "./MobileAccordionNav";
import { ROUTES } from "@/constant";
import { cn } from "@/lib/utils";

interface IProps {
  showMobileNav: boolean;
  toggleMobileNav: () => void;
}

export default function MobileNavbar({
  showMobileNav,
  toggleMobileNav,
}: IProps) {
  return (
    <div
      className={cn(
        "xl:hidden fixed inset-0 z-50 overflow-y-auto px-5 p-top bg-white transition-transform duration-300 ease-in-out",
        showMobileNav ? "translate-y-0" : "-translate-y-full"
      )}
      role="dialog"
      aria-modal="true"
    >
      <ul className=" flex flex-col gap-6 max-w-md mx-auto">
        <MobileAccordionNav navbar={navbar} toggleMobileNav={toggleMobileNav} />
        <li>
          <Link
            href={ROUTES.SIGNUP}
            className="block text-dark-secondary text-base font-normal"
            onClick={toggleMobileNav}
          >
            Sign Up
          </Link>
        </li>
        <li>
          <FormButton
            href={ROUTES.LOGIN}
            variant="outline"
            className="w-full text-primary"
            onClick={toggleMobileNav}
          >
            Login
          </FormButton>
        </li>
        <li>
          <FormButton
            href={ROUTES.POST_TASK}
            onClick={toggleMobileNav}
            className="w-full"
          >
            Post a task for free
          </FormButton>
        </li>
      </ul>
    </div>
  );
}
