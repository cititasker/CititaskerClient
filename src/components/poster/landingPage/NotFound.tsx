"use client";
import FormButton from "@/components/forms/FormButton";
import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[rgba(2,22,55,0.70)]">
        <div className="container flex justify-center items-center h-full">
          <div className="w-fit text-center py-10">
            <h2 className="header text-white mb-3">
              Couldn’t find what you want?
            </h2>
            <p className="sub_header max-w-[31.625rem] mx-auto text-center">
              Our Help Centre and dedicated CitiTasker Support specialist are on
              hand 24/7 to help you navigate our tools and get the most out of
              our website. You can count on them always
            </p>
            <FormButton
              href="/post-task"
              text="Post a task for free"
              btnStyle="mt-12 mx-auto"
            />
          </div>
        </div>
      </div>
      <Image
        src="/images/hero.png"
        alt=""
        width={1400}
        height={600}
        className="object-cover w-full h-[32.5rem]"
      />
    </div>
  );
};

export default NotFound;
