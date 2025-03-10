"use client";
import Link from "next/link";
import React from "react";
import { HiChevronDown } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

interface IProps {
  nav: {
    name: string;
    children: {
      category: string;
      children: { name: string; href: string }[];
    }[];
  };
  extraClass: string;
}

const slideUpVariants = {
  initial: { y: 30, opacity: 0, x: "-50%", transition: { duration: 0.1 } },
  animate: { y: 0, opacity: 1, transition: { duration: 0.1 } },
};

const CategoryDropdown = ({ nav, extraClass }: IProps) => {
  return (
    <motion.li
      initial="initial"
      whileHover="animate"
      //   animate="initial"
      className={twMerge(
        "group cursor-pointer text-dark-secondary text-base mr-2 xl:mr-4 last:mr-0 flex items-center p-2.5 h-full",
        extraClass
      )}
    >
      {nav.name}{" "}
      <HiChevronDown className="text-xl ml-1 text-dark-secondary font-light group-hover:rotate-180 transition-transform duration-200" />
      <motion.div
        variants={slideUpVariants}
        className="absolute transition-all duration-500 hidden group-hover:block !left-[50%] top-[90%] w-full max-w-[62.5rem]"
      >
        <div className="w-full h-[40.625rem] mt-5 bg-white rounded-30 py-[4.375rem] px-[5.75rem] overflow-y-auto">
          <ul className="w-fit columns-4 gap-x-12">
            {nav.children.map((item, i) => (
              <li
                key={`second-${i}`}
                className="h-auto mb-10 break-inside-avoid w-full"
              >
                <p className="text-primary mb-3 text-base font-semibold">
                  {item.category}
                </p>
                <ul className="whitespace-nowrap">
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
      </motion.div>
    </motion.li>
  );
};

export default CategoryDropdown;
