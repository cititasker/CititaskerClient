"use client";
import Image from "next/image";
import React from "react";
import { statsData } from "../../data";

const Stats = () => {
  return (
    <div className="bg-secondary">
      <div className="container py-[3.75rem]">
        <div className="max-w-[58.5rem] mx-auto w-full flex justify-between items-center flex-col md:flex-row gap-y-[4.25rem] gap-x-4">
          {statsData.map((item, i) => (
            <div key={i}>
              <Image
                src={item.icon}
                alt=""
                width={50}
                height={35}
                className="object-contain mx-auto block w-10 h-10"
              />
              <p className="mt-7 text-white font-semibold text-2xl">
                {item.stat}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
