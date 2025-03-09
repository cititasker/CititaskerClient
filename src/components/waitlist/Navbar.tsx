"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { MdClose } from "react-icons/md";
// import WaitlistModalForm from "./WaitlistModalForm";
import Icons from "../Icons";
import FormButton from "../forms/FormButton";
import { useAppDispatch } from "@/store/hook";
import { toggleWaitlistModal } from "@/store/slices/general";
import Image from "next/image";

const navbar = [
  {
    href: "/waitlist",
    name: "Home",
  },
  {
    href: "#why_cititasker",
    name: "Why CitiTasker",
  },
  {
    href: "#faq",
    name: "FAQ",
  },
];

const Navbar = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [active, setActive] = useState("");
  const path = usePathname();
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHashChange = () => {
        if (window.location.hash) {
          setActive(window.location.hash);
        } else {
          setActive(path);
        }
      };
      window.addEventListener("hashchange", () => {
        handleHashChange();
      });
      handleHashChange();
      return () => {
        window.removeEventListener("hashchange", handleHashChange);
      };
    }
  }, [params]);

  const toggleMobileNav = () => {
    setShowMobileNav((prev) => !prev);
  };

  return (
    <div className="px-5 fixed top-5  w-full  z-[99]">
      <div className="shadow-md flex items-center rounded-[3.125rem] px-5 h-[4.688rem] w-full max-w-[87.5rem] mx-auto bg-white">
        <div className="max-w-[79.375rem] w-full mx-auto flex justify-between items-center relative">
          <Link href="/waitlist">
            <Image
              src="/icons/logo_icon.svg"
              alt="brand_logo"
              width={200}
              height={70}
              className="h-5 w-auto sm:h-auto"
            />
          </Link>
          <ul className="hidden items-center mx-2 md:flex">
            {navbar.map((nav, i) => (
              <li
                key={i}
                className={`text-dark-secondary text-base mr-4 last:mr-0 p-2.5 ${
                  active === nav.href && "border-b-[3px] border-primary"
                }`}
              >
                <Link href={nav.href}>{nav.name}</Link>
              </li>
            ))}
          </ul>
          <FormButton
            text="Join Waitlist"
            btnStyle="hidden md:flex"
            handleClick={() => dispatch(toggleWaitlistModal())}
          />
          <Icons.hambuger
            className="md:hidden cursor-pointer"
            onClick={toggleMobileNav}
          />
        </div>
      </div>
      <div
        className={`fixed px-5 left-0 top-0 bg-white w-full transition-all duration-300 ease-[cubic-bezier(.75,.26,.93,.59)] overflow-hidden ${
          showMobileNav ? "h-dvh" : "h-0"
        }`}
      >
        <div className="min-h-[75px] w-full px-5 flex items-center justify-between mt-5">
          <Link href="/">
            <Icons.logo className="inline-block h-5 w-fit" />
          </Link>
          <MdClose className="text-2xl" onClick={toggleMobileNav} />
        </div>
        <div className="mt-8">
          <ul className="w-fit flex flex-col gap mx-auto mb-6">
            {navbar.map((el, i) => (
              <li
                key={i}
                className={`text-center border-b-[3px] w-fit mx-auto mb-6 last:mb-0 ${
                  active === el.href
                    ? "active border-primary"
                    : "border-transparent"
                }`}
                onClick={toggleMobileNav}
              >
                <Link
                  href={el.href}
                  className="inline-block p-2.5 text-base font-normal text-dark-secondary"
                >
                  {el.name}
                </Link>
              </li>
            ))}
          </ul>
          <FormButton
            text="Join Waitlist"
            btnStyle="mx-auto"
            handleClick={toggleWaitlistModal}
          />
        </div>
      </div>
      {/* <WaitlistModalForm /> */}
    </div>
  );
};

export default Navbar;
