"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdClose } from "react-icons/md";

import Icons from "../Icons";
import FormButton from "../forms/FormButton";
import WaitlistModalForm from "./WaitlistModalForm";

import { useAppDispatch } from "@/store/hook";
import { toggleWaitlistModal } from "@/store/slices/general";
import { Logo } from "@/constant/icons";
import { ROUTES } from "@/constant";

const NAV_ITEMS = [
  { href: "#home", name: "Home" },
  { href: "#why_cititasker", name: "Why CitiTasker" },
  { href: "#faq", name: "FAQ" },
];

const Navbar = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [active, setActive] = useState("#home");

  const dispatch = useAppDispatch();

  useEffect(() => {
    setActive(window.location.hash || "#home");

    const onHashChange = () => setActive(window.location.hash);
    window.addEventListener("hashchange", onHashChange);

    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleToggleMobileNav = useCallback(() => {
    setShowMobileNav((prev) => !prev);
  }, []);

  const handleJoinWaitlist = useCallback(() => {
    dispatch(toggleWaitlistModal());
    setShowMobileNav(false);
  }, [dispatch]);

  const renderNavLinks = (isMobile = false) =>
    NAV_ITEMS.map(({ href, name }, idx) => (
      <li
        key={idx}
        onClick={isMobile ? handleToggleMobileNav : undefined}
        className={`text-base p-2.5 ${
          active === href
            ? "border-b-[3px] border-primary"
            : "border-transparent"
        } ${
          isMobile
            ? "text-center w-fit mx-auto mb-6 last:mb-0"
            : "text-dark-secondary mr-4 last:mr-0"
        }`}
      >
        <Link href={href} className="inline-block text-dark-secondary">
          {name}
        </Link>
      </li>
    ));

  return (
    <div className="fixed top-5 w-full z-40 px-5">
      <div className="shadow-md bg-white rounded-[3.125rem] h-[4.688rem] px-5 flex items-center max-w-[87.5rem] mx-auto">
        <div className="w-full flex justify-between items-center max-w-[79.375rem] mx-auto">
          <a href={`${ROUTES.WAITLIST}#home`}>
            <Image
              src="/icons/logo_icon.svg"
              alt="brand_logo"
              width={200}
              height={70}
              className="h-5 w-auto sm:h-auto"
            />
          </a>

          <ul className="hidden md:flex items-center mx-2">
            {renderNavLinks()}
          </ul>

          <FormButton
            text="Join waitlist"
            className="hidden md:flex"
            handleClick={() => dispatch(toggleWaitlistModal())}
          />

          <Icons.hambuger
            className="md:hidden cursor-pointer"
            onClick={handleToggleMobileNav}
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 bg-white w-full px-5 transition-all duration-500 ease-[cubic-bezier(.75,.26,.93,.59)] overflow-hidden ${
          showMobileNav ? "h-dvh" : "h-0"
        }`}
      >
        <div className="min-h-[75px] flex items-center justify-between mt-5 px-5">
          <Link href={ROUTES.WAITLIST}>
            <Logo className="inline-block h-5 w-fit" />
          </Link>
          <MdClose className="text-2xl" onClick={handleToggleMobileNav} />
        </div>

        <ul className="mt-8 mb-6 flex flex-col gap mx-auto w-fit">
          {renderNavLinks(true)}
        </ul>

        <FormButton
          text="Join waitlist"
          className="mx-auto"
          handleClick={handleJoinWaitlist}
        />
      </div>

      <WaitlistModalForm />
    </div>
  );
};

export default Navbar;
