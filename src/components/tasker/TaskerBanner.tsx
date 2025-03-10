"use client";
import Image from "next/image";
import React from "react";
import Chef from "@/../public/images/hiw-4.svg";
import FormButton from "../forms/FormButton";
import Icons from "../Icons";

const data = [
  "Both parties must agree to decrease the price via CitiTasker private messages and explicitly state the new amount.",
  "Contact CitiTasker once both parties have written that they agree to a decrease in the task price and stated what the new amount should be.",
];

const TaskerBanner = () => {
  return (
    <div className="">
      <div className="container py-[6.438rem]">
        <div className="relative w-full max-w-[72.25rem] mx-auto">
          <Image
            src={Chef}
            alt=""
            width={200}
            height={420}
            className="absolute top-[10%] w-full max-w-[28.125rem] h-[26.25rem] object-cover rounded-30"
          />
          <div className="rounded-30 overflow-hidden bg-[url('/images/bg_secondary.svg')] bg-no-repeat bg-cover py-[3.5rem] px-20 max-w-[56.625rem] w-full ml-auto">
            <div className="max-w-[32rem] text-white ml-auto">
              <h2 className="text-[2rem] font-bold mb-12">
                Become a Tasker, earn more.
              </h2>
              <ul className="mb-[2.75rem]">
                {data.map((el, i) => (
                  <li key={i} className="flex items-start mb-7 last:mb-0">
                    <Icons.contentCopy className="mr-7 flex-shrink-0" />
                    <span>{el}</span>
                  </li>
                ))}
              </ul>
              <FormButton
                href="#"
                text="Earn on CitiTasker"
                btnStyle="bg-secondary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskerBanner;
