"use client";
import Image from "next/image";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="w-full h-auto bg-white rounded-30 ">
      {/* Profile Section */}
      <div className="flex p-6 flex-col justify-between items-start text-center">
        <div className="self-center">
          <Image
            src="/images/taskPicture.png"
            alt="profile"
            width={100}
            height={100}
            className="shrink-0 grow-0 rounded-full mt-8 object-cover"
          />
          <p className="text-xl font-semibold mt-2">Judith N.</p>
        </div>
        <div className=" flex items-center mt-2">
          <MdLocationOn className="mr-1" />
          Badore Ajah, Lagos
        </div>
        <div className="flex items-center  mt-2">
          <div className="text-[#F2AF42] flex items-center ">
            <AiFillStar className="mr-1" />
            <AiFillStar className="mr-1" />
            <AiFillStar className="mr-1" />
            <AiFillStar className="mr-1" />
            <AiFillStar className="mr-1" />
          </div>
          <span className="text-sm">5.0</span>
          <span className="text-sm ml-1">(3259 reviews)</span>
        </div>
        <p className="text-sm  mt-2">
          Last online about 2 hours ago
        </p>
      </div>

      {/* Skills Section */}
      <div className="mt-8 p-6 border-t py-2">
        <h3 className="text-lg font-[600]">Skills</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {["Mould Assessment and Plumbing", "Plumbing"].map((skill, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* License Section */}
      <div className="mt-8 border-t p-6">
        <h3 className="text-lg font-semibold">License</h3>
        <div className="flex justify-center gap-4 mt-2">
          {[
            "/images/license1.jpg",
            "/images/license2.jpg",
            "/images/license1.jpg",
            "/images/license2.jpg",
          ]?.map((license, index) => (
            <Image
              key={index}
              src={license}
              alt={`license ${index + 1}`}
              width={50}
              height={50}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
