"use client";
import Image from "next/image";
import React from "react";
import BannerLeftImage from "@/assets/images/how_it_works/banner_left_img.svg?url";
import FormButton from "../forms/FormButton";
import Icons from "../Icons";

const data = [
  {
    title: "Earn More on Your Terms",
    desc: "With CitiTasker, you have the freedom to choose tasks that match your skills, location, and schedule",
  },
  {
    title: "Secure Payments",
    desc: "We secure your payments in CitiTasker escrow and released directly to your bank account once the task is completed, ensuring peace of mind",
  },
  {
    title: "Free to join",
    desc: "Signing up as a Tasker is completely free. Start earning without any upfront costs.",
  },
];

const TaskerBanner = () => {
  return (
    <div className="container-w !px-0 xl:py-[6.438rem]">
      <div className="relative w-full xl:max-w-[72.25rem] mx-auto">
        <Image
          src={BannerLeftImage}
          alt=""
          width={200}
          height={500}
          className="hidden xl:inline-block z-10 absolute top-[10%] w-full max-w-[28.125rem] h-[31.25rem] object-cover rounded-30"
        />
        <div className="xl:rounded-30 overflow-hidden bg-[url('/images/bg_secondary_mobile.svg')] bg-no-repeat bg-cover py-9 px-4 sm:px-10 md:px-20 max-w-full xl:max-w-[56.625rem] w-full ml-auto">
          <div className="max-w-full xl:max-w-[36rem] text-white ml-auto">
            <h2 className="text-[2rem] font-bold mb-3 tracking-normal text-left">
              Earn up to ₦500,000 a month helping others with their tasks on
              CitiTasker
            </h2>
            <Image
              src={BannerLeftImage}
              alt=""
              width={200}
              height={500}
              className="xl:hidden w-full max-w-[350px] sm:max-w-[400px] mx-auto h-auto object-cover object-top rounded-30 my-[26px]"
            />
            <ul className="mb-10 flex flex-col gap-2.5">
              {data.map((el, i) => (
                <li key={i} className="flex flex-col gap-y-1">
                  <div className="flex items-center sm:items-start gap-5 sm:gap-7">
                    <Icons.contentCopy className="flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="text-xl font-bold">{el.title}</p>
                      <p className="text-sm font-normal hidden sm:block">
                        {el.desc}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-normal sm:hidden">{el.desc}</p>
                </li>
              ))}
            </ul>
            <FormButton
              href="#"
              text="Earn on CitiTasker"
              className="bg-white text-primary mx-auto sm:ml-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskerBanner;
