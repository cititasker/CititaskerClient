"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { useParams, usePathname } from "next/navigation";
import { MdClose, MdOutlineMessage } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { logoutUser } from "@/actions/authActions";
import FormButton from "../forms/FormButton";
import CategoryDropdown from "../CategoryDropdown";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { defaultProfile } from "@/constant/images";
import Icons from "../Icons";
import { loggedInUser } from "@/utils";
import { logout } from "@/store/slices/user";
import { ROLE, ROUTES } from "@/constant";
import { navbar, profileMenu } from "../../../data";

// full navbar array and profileMenu are defined here (trimmed for brevity)
// navbar = [...];
// profileMenu = [...];

interface IProp {
  isAuth: boolean;
}

const MainNavbar = ({ isAuth }: IProp) => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [active, setActive] = useState("");
  const path = usePathname();
  const params = useParams();
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHashChange = () => {
        setActive(window.location.hash || path);
      };
      window.addEventListener("hashchange", handleHashChange);
      handleHashChange();
      return () => {
        window.removeEventListener("hashchange", handleHashChange);
      };
    }
  }, [params]);

  const toggleMobileNav = () => {
    setShowMobileNav((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    logoutUser();
  };

  return (
    <div className="fixed w-[95%] left-1/2 -translate-x-1/2 top-5 z-[100]">
      <div className="shadow-md max-w-[87.5rem] mx-auto h-[4.688rem] flex items-center rounded-[3.125rem] px-5 w-full bg-white">
        <div className="max-w-[79.375rem] w-full mx-auto flex justify-between items-center relative">
          <Link href="/">
            <Image
              src="/icons/logo_icon.svg"
              alt="brand_logo"
              width={200}
              height={70}
              className="h-5 w-auto sm:h-auto"
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center mx-2 lg:flex">
            {navbar.map((nav, i) =>
              nav?.children ? (
                <CategoryDropdown key={i} nav={nav} extraClass="" />
              ) : isAuth && nav.name === "Browse Tasks" ? (
                <ul key={i} className="flex items-center">
                  <li
                    className={`text-dark-secondary text-base mr-4 last:mr-0 p-2.5 ${
                      path.includes(nav.href) && "border-b-[3px] border-primary"
                    }`}
                  >
                    <Link href={nav.href}>{nav.name}</Link>
                  </li>
                  <li
                    className={`text-dark-secondary text-base mr-4 last:mr-0 p-2.5 ${
                      path.includes("/my-tasks") &&
                      "border-b-[3px] border-primary"
                    }`}
                  >
                    <Link href={`/${user.role}/${ROUTES.MY_TASKS}`}>
                      My Tasks
                    </Link>
                  </li>
                </ul>
              ) : (
                <li
                  key={i}
                  className={`text-dark-secondary text-base mr-4 last:mr-0 p-2.5 ${
                    path === nav.href && "border-b-[3px] border-primary"
                  }`}
                >
                  <Link href={nav.href}>{nav.name}</Link>
                </li>
              )
            )}
          </ul>

          {/* Right side buttons */}
          {isAuth ? (
            <div className="items-center gap-8 hidden xl:flex">
              <FormButton text="Post a Task" href={ROUTES.POST_TASK} />
              <div className="flex gap-5 items-center">
                <MdOutlineMessage className="text-2xl cursor-pointer" />
                <div className="relative cursor-pointer">
                  <span className="w-[14px] h-[14px] rounded-full bg-red-state-color absolute -top-[6px] right-0"></span>
                  <IoNotificationsOutline className="text-2xl" />
                </div>
                <div className="relative group">
                  <div className="flex items-center gap-1">
                    <Image
                      width={30}
                      height={30}
                      src={user.profile_image || defaultProfile}
                      alt="user_profile"
                      className="w-[1.875rem] h-[1.875rem] rounded-full object-cover"
                    />
                    <button className="p-[7px] flex items-center gap-1">
                      <span className="text-[17px] text-dark-secondary font-medium leading-normal font-montserrat">
                        {loggedInUser(user.first_name, user.last_name)}
                      </span>
                      <Icons.dropdown
                        width={20}
                        height={20}
                        className="group-hover:rotate-180 transition-all"
                      />
                    </button>
                  </div>
                  <div className="z-[99] hidden group-hover:inline-block min-w-[294px] w-fit absolute top-[102%] left-1/2 -translate-x-1/2">
                    <ul className="shadow-md mt-5 bg-white rounded-20 px-5 py-[1.875rem] w-full">
                      <li className="flex items-center gap-2 mb-6">
                        <Image
                          src={user.profile_image || defaultProfile}
                          alt="profile image"
                          className="w-[50px] h-[50px] object-cover rounded-full"
                          width={50}
                          height={50}
                        />
                        <div>
                          <p className="text-base text-black-2 font-normal leading-normal mb-1">
                            {loggedInUser(user.first_name, user.last_name)}
                          </p>
                          <p className="text-dark-grey-2 text-sm font-normal leading-normal">
                            {user.email}
                          </p>
                        </div>
                      </li>
                      <li className="mb-6">
                        <FormButton
                          text={`Switch to ${
                            user.role === ROLE.tasker ? "Poster" : "Tasker"
                          }`}
                          href="/"
                          className="w-full bg-transparent font-medium border-[1.5px] border-primary text-primary"
                        />
                      </li>
                      {profileMenu.map((el, i) =>
                        el.name !== "Logout" ? (
                          <li key={i} className="mb-6 last:mb-0">
                            <Link
                              href={el.href}
                              className="flex items-center gap-4"
                            >
                              <el.icon />
                              <span className="inline-block text-base text-dark-secondary">
                                {el.name}
                              </span>
                            </Link>
                          </li>
                        ) : (
                          <li key={i} className="mb-6 last:mb-0">
                            <button
                              className="flex items-center gap-4"
                              onClick={handleLogout}
                            >
                              <Icons.logout />
                              <span className="inline-block text-base text-[#EC514B]">
                                {el.name}
                              </span>
                            </button>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="items-center gap-4 hidden xl:flex">
              <Link href={ROUTES.SIGNUP} className="inline-block">
                Sign Up
              </Link>
              <FormButton
                text="Login"
                href={ROUTES.LOGIN}
                className="border-[1.5px] border-solid border-primary bg-transparent text-primary"
              />
              <FormButton href={ROUTES.POST_TASK} text="Post a task for free" />
            </div>
          )}

          <Image
            src="/icons/hamburger.svg"
            alt="hamburger-icon"
            width={20}
            height={40}
            className="xl:hidden cursor-pointer w-auto h-auto"
            onClick={toggleMobileNav}
          />
        </div>
      </div>

      {/* Mobile nav logic is similar, and can be appended here if needed */}
    </div>
  );
};

export default MainNavbar;
