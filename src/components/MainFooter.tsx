"use client";
import Image from "next/image";
import React from "react";
import { company, explore, legal, socials, taskCategories } from "../../data";
import Link from "next/link";

const MainFooter = () => {
  return (
    <div className="bg-dark-secondary">
      <div className="container py-[5.375rem]">
        <div className="flex flex-col xl:flex-row gap-x-5 gap-y-[4.5rem] justify-between pb-[5.75rem] border-b border-primary mb-[3.625rem]">
          <div>
            <Image
              src="/icons/logo_icon.svg"
              alt="logo"
              height={32}
              width={192}
              className="mb-7"
            />
            <p className="text-base font-normal max-w-[24rem] w-full text-white">
              Borem ipsum dolor sit amet, consectetur adipiscing elit. Borem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="flex flex-1 xl:max-w-[900px] w-full">
            <div className="flex-1 flex-col">
              <ul className="flex-1">
                <li className="font-semibold text-xl text-white mb-8">
                  Categories
                </li>

                {taskCategories.map((item, i) => (
                  <li
                    key={i}
                    className="mb-5 last:mb-0 text-base font-normal text-dark-grey-2"
                  >
                    <Link href={item.href}>{item.name}</Link>
                  </li>
                ))}
              </ul>
              <ul className="w-full sm:hidden mt-10">
                <li className="font-semibold text-xl text-white mb-8">
                  Get in touch
                </li>
                <li className="mb-5 last:mb-0 text-base font-normal text-dark-grey-2">
                  10 Samuel Arijojoye, Lekki Phase 1, Lagos State.
                </li>
                <li className="mb-5 last:mb-0 text-base font-normal text-dark-grey-2">
                  <a href="tel:+2348054872319" className="">
                    +234 8054872319
                  </a>
                </li>
                <li className="mb-5 last:mb-0 text-base font-normal text-dark-grey-2">
                  <a href="mailto:cititasker@gmail.com" className="">
                    cititasker@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col flex-1 sm:hidden">
              <ul className="flex-1">
                <li className="font-semibold text-xl text-white mb-8">
                  Company
                </li>

                {company.map((item, i) => (
                  <li
                    key={i}
                    className="mb-5 last:mb-0 text-base font-normal text-dark-grey-2"
                  >
                    <Link href={item.href}>{item.name}</Link>
                  </li>
                ))}
              </ul>
              <ul className="flex-1">
                <li className="font-semibold text-xl text-white mb-8">
                  Explore
                </li>

                {explore.map((item, i) => (
                  <li
                    key={i}
                    className="mb-5 last:mb-0 text-base font-normal text-dark-grey-2"
                  >
                    <Link href={item.href}>{item.name}</Link>
                  </li>
                ))}
              </ul>
              <ul className="flex-1">
                <li className="font-semibold text-xl text-white mb-8">Legal</li>

                {legal.map((item, i) => (
                  <li
                    key={i}
                    className="mb-5 last:mb-0 text-base font-normal text-dark-grey-2"
                  >
                    <Link href={item.href}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="flex-1 hidden sm:block">
              <li className="font-semibold text-xl text-white mb-8">Company</li>

              {company.map((item, i) => (
                <li
                  key={i}
                  className="mb-5 last:mb-0 text-base font-normal text-dark-grey-2"
                >
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
            <ul className="flex-1 hidden sm:block">
              <li className="font-semibold text-xl text-white mb-8">Explore</li>

              {explore.map((item, i) => (
                <li
                  key={i}
                  className="mb-5 last:mb-0 text-base font-normal text-dark-grey-2"
                >
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
            <ul className="flex-1 hidden sm:block">
              <li className="font-semibold text-xl text-white mb-8">Legal</li>

              {legal.map((item, i) => (
                <li
                  key={i}
                  className="mb-5 last:mb-0 text-base font-normal text-dark-grey-2"
                >
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
            <ul className="max-w-[9.375rem] w-full hidden sm:block">
              <li className="font-semibold text-xl text-white mb-8">
                Get in touch
              </li>
              <li className="mb-5 last:mb-0 text-base font-normal text-dark-grey-2">
                10 Samuel Arijojoye, Lekki Phase 1, Lagos State.
              </li>
              <li className="mb-5 last:mb-0 text-base font-normal text-dark-grey-2">
                <a href="tel:+2348054872319" className="">
                  +234 8054872319
                </a>
              </li>
              <li className="mb-5 last:mb-0 text-base font-normal text-dark-grey-2">
                <a href="mailto:cititasker@gmail.com" className="">
                  cititasker@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold text-base text-center text-white">
            © Copyright {new Date().getFullYear()}, All Right Reserved by
            citiTasker
          </p>
          <div className="inline-flex gap-6 items-center text-white">
            {socials.map((el, i) => (
              <a key={i} href={el.href}>
                <el.icon className="text-2xl" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
