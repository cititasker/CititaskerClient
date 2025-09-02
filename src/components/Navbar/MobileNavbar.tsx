import React from "react";
import Link from "next/link";
import { navbar } from "../../../data";
import FormButton from "../forms/FormButton";
import MobileAccordionNav from "./MobileAccordionNav";
import { ROUTES } from "@/constant";
import CustomSheet from "../reusables/CustomSheet";

interface IProps {
  showMobileNav: boolean;
  toggleMobileNav: any;
}

export default function MobileNavbar({
  showMobileNav,
  toggleMobileNav,
}: IProps) {
  return (
    <CustomSheet
      title={""}
      open={showMobileNav}
      onOpenChange={toggleMobileNav}
      side="right"
      showCloseIcon={false}
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
    </CustomSheet>
  );
}
