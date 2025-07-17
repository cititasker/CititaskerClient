"use client";
import Image from "next/image";
import React from "react";
import { company, explore, legal, socials, taskCategories } from "../../data";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const MainFooter = () => {
  return (
    <div className="bg-dark-secondary">
      <div className="container-w py-10 sm:py-[5.375rem]">
        {/* TOP SECTIONS */}
        <div className="flex flex-col xl:flex-row gap-x-5 gap-y-[4.5rem] justify-between pb-[3.5rem] border-b border-primary mb-[5rem]">
          {/* LOGO + DESCRIPTION */}
          <div>
            <Image
              src="/images/footer-logo.svg"
              alt="logo"
              height={32}
              width={192}
              className="mb-7"
            />
            <p className="text-base font-normal leading-relaxed max-w-[24rem] w-full text-white">
              CitiTasker is a trusted platform designed to connect people in
              need of help with people who are ready to work. With secure
              payments, verified Taskers, and 24/7 support, CitiTasker is your
              go-to platform for getting things done quickly and efficiently.
            </p>
          </div>

          {/* NAVIGATION SECTIONS */}
          <div className="flex flex-1 xl:max-w-[900px] w-full flex-wrap gap-y-10">
            {/* Categories */}
            <div className="flex-1 flex-col">
              <ul className="flex-1">
                <li className="font-semibold text-xl text-white mb-8">
                  Categories
                </li>
                {taskCategories.map((item, i) => (
                  <motion.li
                    key={i}
                    className="mb-5 last:mb-0 text-base font-normal text-dark-grey-2"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <Link href={item.href}>{item.name}</Link>
                  </motion.li>
                ))}
              </ul>

              {/* Get in touch (mobile only) */}
              <ul className="w-full sm:hidden mt-10">
                <li className="font-semibold text-xl text-white mb-8">
                  Get in touch
                </li>
                {[
                  "10 Samuel Arijojoye, Lekki Phase 1, Lagos State.",
                  "+234 8054872319",
                  "cititasker@gmail.com",
                ].map((text, i) => (
                  <motion.li
                    key={i}
                    className="mb-5 last:mb-0 text-base font-normal text-dark-grey-2"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    {text.includes("@") ? (
                      <a href={`mailto:${text}`}>{text}</a>
                    ) : text.includes("+234") ? (
                      <a href={`tel:${text.replace(/ /g, "")}`}>{text}</a>
                    ) : (
                      text
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Mobile lists */}
            <div className="flex flex-col flex-1 sm:hidden">
              {[
                { title: "Company", items: company },
                { title: "Explore", items: explore },
                { title: "Legal", items: legal },
              ].map((section, idx) => (
                <ul className="flex-1" key={idx}>
                  <li className="font-semibold text-xl text-white mb-8">
                    {section.title}
                  </li>
                  {section.items.map((item, i) => (
                    <motion.li
                      key={i}
                      className="mb-5 last:mb-0 text-base font-normal text-dark-grey-2"
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <Link href={item.href}>{item.name}</Link>
                    </motion.li>
                  ))}
                </ul>
              ))}
            </div>

            {/* Desktop Sections */}
            {[
              { title: "Company", items: company },
              { title: "Explore", items: explore },
              { title: "Legal", items: legal },
            ].map((section, idx) => (
              <ul className="flex-1 hidden sm:block" key={idx}>
                <li className="font-semibold text-xl text-white mb-8">
                  {section.title}
                </li>
                {section.items.map((item, i) => (
                  <motion.li
                    key={i}
                    className="mb-5 last:mb-0 text-base font-normal text-dark-grey-2"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <Link href={item.href}>{item.name}</Link>
                  </motion.li>
                ))}
              </ul>
            ))}

            {/* Get in touch (desktop) */}
            <ul className="max-w-[9.375rem] w-full hidden sm:block">
              <li className="font-semibold text-xl text-white mb-8">
                Get in touch
              </li>
              {[
                "10 Samuel Arijojoye, Lekki Phase 1, Lagos State.",
                "+234 8054872319",
                "cititasker@gmail.com",
              ].map((text, i) => (
                <motion.li
                  key={i}
                  className="mb-5 last:mb-0 text-base font-normal text-dark-grey-2"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {text.includes("@") ? (
                    <a href={`mailto:${text}`}>{text}</a>
                  ) : text.includes("+234") ? (
                    <a href={`tel:${text.replace(/ /g, "")}`}>{text}</a>
                  ) : (
                    text
                  )}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* COPYRIGHT & SOCIALS */}
        <div className="flex justify-between flex-col-reverse sm:flex-row gap-x-3 gap-y-8 items-center">
          <p className="font-semibold text-base text-center text-white">
            © Copyright {new Date().getFullYear()}, All Right Reserved by
            citiTasker
          </p>
          <div className="inline-flex gap-6 items-center text-white">
            {socials.map((el, i) => (
              <motion.a
                key={i}
                href={el.href}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <el.icon className="text-2xl" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
