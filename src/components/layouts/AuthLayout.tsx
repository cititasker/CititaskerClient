"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import AuthBg1 from "../../../public/images/hiw-1.svg?url";
import AuthBg2 from "../../../public/images/hiw-2.svg?url";
import AuthBg3 from "../../../public/images/hiw-3.svg?url";
import { cn } from "@/utils";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constant";

interface IProps {
  children: React.ReactNode;
  extraClass?: string;
}

const data = [
  {
    img: AuthBg1,
    text: "CitiTasker insurance covers Taskers liability to the third parties for personal injury or property damage while performing most task activities (T&C apply) – so you can work with your mind at rest",
  },
  {
    img: AuthBg2,
    text: "Pay easily, with peace of mind. We hold payments secure in CitiTasker pay escrow account until the task has been completed and you're 100% satisfied.",
  },
  {
    img: AuthBg3,
    text: "You have to be registered on CitiTasker to be a Tasker. Create an account on our website, it only takes a minute and costs nothing. Jumpstart your reputation by setting up your profile, set your skills and verify your info. ",
  },
];
const AuthLayout = ({ children, extraClass }: IProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev == data.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={cn(
        "bg-white lg:bg-light-primary-1",
        pathname == ROUTES.CREATE_ACCOUNT && "bg-light-primary-1"
      )}
    >
      <div className="min-h-dvh relative">
        <div className="flex">
          <div className="relative flex-1 w-full h-screen hidden md:block overflow-hidden [clip-path:inset(0)]">
            {data.map((el, i) => (
              <Image
                key={i}
                src={el.img}
                alt=""
                className={`h-full w-full scale-[1.02] object-cover absolute top-0 left-0 transition-transform duration-500 ${
                  activeIndex == i ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="z-[20] absolute rounded-20 bottom-[8%] w-[80%] left-1/2 translate-x-[-50%] px-[1.875rem] py-9 bg-[rgb(35,111,142)]/60 backdrop-blur-[8px]">
              <div className="flex overflow-scroll mb-[2.5rem] hide-scrollbar">
                {data.map((el, i) => (
                  <p
                    key={i}
                    className="text-white  min-w-full transition-transform duration-300"
                    style={{ transform: `translateX(${-activeIndex * 100}%)` }}
                  >
                    {el.text}
                  </p>
                ))}
              </div>
              <div className="flex items-center">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-4 h-4 rounded-full  mr-2.5 last:mr-0 cursor-pointer transition-colors duration-300 ${
                      activeIndex === i ? "bg-primary" : "bg-white"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  ></span>
                ))}
              </div>
            </div>
          </div>
          <div className={cn("min-h-dvh px-7 flex-1", extraClass)}>
            <Link
              href="/"
              className="flex items-center py-4 w-fit pt-4 md:pt-10"
            >
              <BsArrowLeft className="text-lg text-primary mr-2" />
              <span className="underline text-primary text-base">
                Back to Website
              </span>
            </Link>
            <div className="flex justify-center items-center min-h-[calc(100dvh-96px)]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
