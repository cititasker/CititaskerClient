"use client";
import FormButton from "@/components/forms/FormButton";
import { ROUTES } from "@/constant";
import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    // <div className="relative w-full overflow-hidden">
    //   <div className="absolute top-0 left-0 w-full h-full bg-[rgba(2,22,55,0.70)]">
    //     <div className="container flex justify-center items-center h-full">
    //       <div className="w-fit text-center py-10">
    //         <h2 className="header text-white mb-3">
    //           Couldn’t find what you want?
    //         </h2>
    //         <p className="sub_header max-w-[31.625rem] mx-auto text-center">
    //           Our Help Centre and dedicated CitiTasker Support specialist are on
    //           hand 24/7 to help you navigate our tools and get the most out of
    //           our website. You can count on them always
    //         </p>
    //         <FormButton
    //           href={ROUTES.POST_TASK}
    //           text="Post a task for free"
    //           className="mt-12 mx-auto"
    //         />
    //       </div>
    //     </div>
    //   </div>
    //   <Image
    //     src="/images/hero.png"
    //     alt=""
    //     width={1400}
    //     height={600}
    //     className="object-cover w-full h-[32.5rem]"
    //   />
    // </div>
    <div className="w-full min-h-[247px] bg-[rgba(2,22,55,0.60)] px-5 py-[45px] flex items-center justify-center">
      <div className="max-w-[580px] w-full text-center">
        <p className="text-white text-[2.5rem] font-bold mb-1.5">
          Can’t find the task you want?
        </p>
        <p className="mb-6 text-base text-white">
          No worries! There are many task that deserve you skills on CitiTasker
        </p>
        <FormButton
          href={ROUTES.BROWSE_TASK}
          text="Browse Task"
          className="!bg-white text-primary mx-auto"
        />
      </div>
    </div>
  );
};

export default NotFound;
