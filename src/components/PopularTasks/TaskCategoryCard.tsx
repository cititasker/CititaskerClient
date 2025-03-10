"use client";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

const TaskCategoryCard = () => {
  return (
    <div className="min-h-[18.875rem] rounded-20 overflow-hidden flex flex-col bg-white">
      <Image
        src="/images/plumbing.svg"
        alt=""
        width={400}
        height={214}
        className="object-cover rounded-t-20 w-full h-[13.375rem]"
      />
      <div className="py-4 px-[1.125rem]">
        <div className="flex justify-between items-center mb-4">
          <p className="font-semibold text-base text-dark-secondary">
            Plumbing
          </p>
          <div className="flex items-center gap-1">
            <FaStar className="text-[1rem] text-[#F2AF42]" />
            <span className="text-sm font-normal text-dark-secondary">
              (69)
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Image
            src="/icons/users.svg"
            alt="users"
            width={20}
            height={20}
            className="object-contain w-5 h-5"
          />
          <p className="text-sm leading-normal font-normal">
            76 Tasker available{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskCategoryCard;
