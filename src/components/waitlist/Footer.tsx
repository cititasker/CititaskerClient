"use client";
import React from "react";
import { socials } from "../../../data";

const Footer = () => {
  return (
    <div className="bg-dark-secondary text-white">
      <div className="container-w">
        <div className="py-[60px] flex justify-between flex-col-reverse sm:flex-row gap-x-3 gap-y-5 items-center">
          <p className="font-semibold text-base text-center">
            © Copyright {new Date().getFullYear()}, All Right Reserved by
            citiTasker
          </p>
          <div className="inline-flex gap-6 items-center">
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

export default Footer;
