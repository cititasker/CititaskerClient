"use client";
import React from "react";
import { socials } from "../../../data";

const Footer = () => {
  return (
    <div className="bg-dark-secondary text-white">
      <div className="container">
        <div className="py-[60px] flex justify-between items-center flex-col sm:flex-row gap-y-5">
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
