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

const navbar = [
  {
    href: "/",
    name: "Home",
  },
  {
    href: "#",
    name: "Categories",
    children: [
      {
        category: "Assembler & Installer",
        children: [
          {
            name: "Furniture Assembly",
            href: "#",
          },
          {
            name: "Home Gym Assembly",
            href: "#",
          },
          {
            name: "Bed Assembly",
            href: "#",
          },
          {
            name: "Washing Machine Installation",
            href: "#",
          },
          {
            name: "Wallpaper Installatio",
            href: "#",
          },
          {
            name: "Satellite TV Installation",
            href: "#",
          },
          {
            name: "TV Mounting",
            href: "#",
          },
          {
            name: "Antenna Installation",
            href: "#",
          },
          {
            name: "Aircon Installation",
            href: "#",
          },
        ],
      },
      {
        category: "Automobile",
        children: [
          {
            name: "Auto Electrician",
            href: "#",
          },
          {
            name: "Car Service",
            href: "#",
          },
          {
            name: "Car Wash",
            href: "#",
          },
          {
            name: "Mechanic",
            href: "#",
          },
          {
            name: "Driver",
            href: "#",
          },
          {
            name: "Car Hire",
            href: "#",
          },
        ],
      },
      {
        category: "Business",
        children: [
          {
            name: "Accounting",
            href: "#",
          },
          {
            name: "Digital Marketing",
            href: "#",
          },
          {
            name: "Business Plan",
            href: "#",
          },
          {
            name: "Business Development",
            href: "#",
          },
          {
            name: "Business Management",
            href: "#",
          },
          {
            name: "Strategy Consultant",
            href: "#",
          },
          {
            name: "Admin Assistant",
            href: "#",
          },
          {
            name: "Legal Service",
            href: "#",
          },
        ],
      },
      {
        category: "Cleaner",
        children: [
          {
            name: "Home cleaning",
            href: "#",
          },
          {
            name: "Commercial Cleaning",
            href: "#",
          },
          {
            name: "Laundry",
            href: "#",
          },
        ],
      },
      {
        category: "Deliverer",
        children: [
          {
            name: "Courier",
            href: "#",
          },
          {
            name: "Food Delivery",
            href: "#",
          },
          {
            name: "Furniture Delivery",
            href: "#",
          },
          {
            name: "Parcel Delivery",
            href: "#",
          },
        ],
      },
      {
        category: "Fashion & Beauty",
        children: [
          {
            name: "Bridal Makeup",
            href: "#",
          },
          {
            name: "Manicure",
            href: "#",
          },
          {
            name: "Models",
            href: "#",
          },
          {
            name: "Haircut",
            href: "#",
          },
          {
            name: "Event Planning",
            href: "#",
          },
          {
            name: "Hair dressing",
            href: "#",
          },
          {
            name: "Tailoring",
            href: "#",
          },
        ],
      },
      {
        category: "Event Planner",
        children: [
          {
            name: "Wedding",
            href: "#",
          },
          {
            name: "Entertainment",
            href: "#",
          },
          {
            name: "Ballon Decarotors",
            href: "#",
          },
          {
            name: "Birthday Decarotors",
            href: "#",
          },
          {
            name: "Event Management",
            href: "#",
          },
          {
            name: "Event Planning",
            href: "#",
          },
          {
            name: "Event Security",
            href: "#",
          },
          {
            name: "DJ",
            href: "#",
          },
          {
            name: "Event Setup & Cleaning",
            href: "#",
          },
        ],
      },
      {
        category: "Interior Designer",
        children: [
          {
            name: "Home Decoration",
            href: "#",
          },
        ],
      },
      {
        category: "Home Chef & Caterer",
        children: [
          {
            name: "Party Catering",
            href: "#",
          },
          {
            name: "Baking",
            href: "#",
          },
          {
            name: "Home Cooking",
            href: "#",
          },
          {
            name: "Tradition Meal Preparation",
            href: "#",
          },
        ],
      },
    ],
  },
  {
    href: "/browse-task",
    name: "Browse Tasks",
  },
  {
    href: "#how_it_works",
    name: "How It Works",
  },
];

const profileMenu = [
  {
    icon: Icons.grid,
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Icons.invite,
    name: "Share Invite",
    href: "#",
  },
  {
    icon: Icons.message,
    name: "Feedback",
    href: "#",
  },
  {
    icon: Icons.settings,
    name: "Settings",
    href: "#",
  },
  {
    icon: Icons.logout,
    name: "Logout",
    href: "#",
  },
];

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

  const handleLogout = () => {
    dispatch(logout());
    logoutUser();
  };

  return (
    <div className="px-[57px] fixed w-full top-5 z-[100]">
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
          <ul className="hidden items-center mx-2 lg:flex">
            {navbar.map((nav, i) =>
              nav?.children ? (
                <CategoryDropdown key={i} nav={nav} extraClass="" />
              ) : isAuth ? (
                nav.name === "Browse Tasks" && (
                  <ul key={i} className="flex items-center">
                    <li
                      className={`text-dark-secondary text-base mr-4 last:mr-0 p-2.5 ${
                        path.includes(nav.href) &&
                        "border-b-[3px] border-primary"
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
                      <Link href="/my-tasks">My Tasks</Link>
                    </li>
                  </ul>
                )
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
          {isAuth ? (
            <div className="items-center gap-8 hidden xl:flex">
              <FormButton text="Post a Task" href="/post-task" />
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
                      <li className="flex items-center gap-2 mb-6 w">
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
                            user.role == "tasker" ? "Poster" : "Tasker"
                          }`}
                          href="/"
                          btnStyle="w-full bg-transparent font-medium border-[1.5px] border-primary text-primary"
                        />
                      </li>
                      {profileMenu.map((el, i) => {
                        if (el.name !== "Logout") {
                          return (
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
                          );
                        } else
                          return (
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
                          );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="items-center gap-4 hidden xl:flex">
              <Link href="/create-account" className="inline-block">
                Sign Up
              </Link>
              <FormButton
                text="Login"
                href="/login"
                btnStyle="border-[1.5px] border-solid border-primary bg-transparent text-primary"
              />
              <FormButton href="/post-task" text="Post a task for free" />
            </div>
          )}
          <Image
            src="/icons/hamburger.svg"
            alt="hamburger-icon"
            width={20}
            height={40}
            className="xl:hidden  cursor-pointer w-auto h-auto"
            onClick={toggleMobileNav}
          />
        </div>
      </div>
      <div
        className={`xl:hidden fixed px-2.5 left-0 top-0 bg-white w-full transition-all duration-300 ease-[cubic-bezier(.75,.26,.93,.59)] overflow-hidden ${
          showMobileNav ? "h-dvh" : "h-0"
        }`}
      >
        <div className="min-h-[75px] w-full px-5 flex items-center justify-between mt-5">
          <Link href="/">
            <Image
              src="/icons/logo_icon.svg"
              width={180}
              height={50}
              alt="logo"
              className="inline-block h-5 w-fit"
            />
          </Link>
          <MdClose className="text-2xl" onClick={toggleMobileNav} />
        </div>
        <div className="mt-8">
          <ul className="w-fit flex flex-col gap-6 mx-auto">
            {navbar.map((nav, i) =>
              nav?.children ? (
                <li
                  key={i}
                  className="lg:hidden group w-fit mx-auto cursor-pointer text-dark-secondary text-base flex items-center p-2.5 h-full"
                >
                  {nav.name}{" "}
                  <HiChevronDown className="text-xl ml-1 text-dark-secondary font-light group-hover:rotate-180 transition-transform duration-200" />
                  <div className="absolute transition-all duration-500 hidden group-hover:block left-[50%] translate-x-[-50%] top-[90%] w-full max-w-[62.5rem]">
                    <div className="w-full h-[40.625rem] mt-5 bg-white rounded-30 py-[4.375rem] px-[5.75rem] overflow-y-auto">
                      <ul className="w-full wrp">
                        {nav.children.map((item, i) => (
                          <li key={`second-${i}`} className="h-auto">
                            <p className="text-primary mb-3 text-base font-semibold">
                              {item.category}
                            </p>
                            <ul>
                              {item.children.map((el, i) => (
                                <li
                                  key={`third-${i}`}
                                  className="text-sm text-dark-secondary mb-2 hover:text-primary hover:translate-x-1 transition-all duration-200"
                                >
                                  <Link href="#">{el.name}</Link>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ) : (
                <li
                  key={i}
                  className={`lg:hidden text-center border-b-[3px] w-fit mx-auto ${
                    active === nav.href
                      ? "active border-primary"
                      : "border-transparent"
                  }`}
                  onClick={toggleMobileNav}
                >
                  <Link
                    href={nav.href}
                    className="inline-block p-2.5 text-base font-normal text-dark-secondary"
                  >
                    {nav.name}
                  </Link>
                </li>
              )
            )}
            <li
              className={`text-center border-b-[3px] w-fit mx-auto ${
                active === "signup"
                  ? "active border-primary"
                  : "border-transparent"
              }`}
              onClick={toggleMobileNav}
            >
              <Link
                href="/signup"
                className="inline-block p-2.5 text-base font-normal text-dark-secondary"
              >
                Sign Up
              </Link>
            </li>
            <li className="w-fit mx-auto" onClick={toggleMobileNav}>
              <FormButton
                href="/login"
                btnStyle="text-primary border-2 border-primary bg-transparent"
              >
                Login
              </FormButton>
            </li>
            <li className="w-fit mx-auto" onClick={toggleMobileNav}>
              <FormButton href="/post-task" btnStyle="">
                Post a task for free
              </FormButton>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
