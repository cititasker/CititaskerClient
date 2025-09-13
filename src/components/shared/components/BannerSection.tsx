"use client";

import Image, { StaticImageData } from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import FormButton from "@/components/forms/FormButton";
import Icons from "@/components/Icons";

type DescriptionItem = {
  title: string;
  desc: string;
};

interface BannerSectionProps {
  title: string;
  image: string | StaticImageData;
  items: DescriptionItem[];
  buttonText?: string;
  buttonLink?: string;
  bgImage?: string;
  reverseOnDesktop?: boolean;
  className?: string;
}

const BannerSection = ({
  title,
  image,
  items,
  buttonText = "Learn More",
  buttonLink = "#",
  bgImage = "/images/bg_secondary_mobile.svg",
  reverseOnDesktop = false,
  className = "",
}: BannerSectionProps) => {
  return (
    <div className={cn("container-w !px-0 xl:py-[6.438rem]", className)}>
      <div
        className={cn(
          "relative w-full xl:max-w-[72.25rem] mx-auto",
          reverseOnDesktop && "flex-row-reverse"
        )}
      >
        {/* Desktop Image */}
        <Image
          src={image}
          alt=""
          width={200}
          height={500}
          className="hidden xl:inline-block z-10 absolute top-[10%] w-full max-w-[28.125rem] h-[31.25rem] object-cover rounded-30"
        />

        {/* Content Section */}
        <div
          className="xl:rounded-30 overflow-hidden bg-no-repeat bg-cover py-9 px-4 sm:px-10 md:px-20 max-w-full xl:max-w-[56.625rem] w-full ml-auto"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        >
          <div className="max-w-full xl:max-w-[36rem] text-white ml-auto">
            {/* Title */}
            <h2 className="text-[2rem] font-bold mb-3 tracking-normal text-left">
              {title}
            </h2>

            {/* Mobile Image */}
            <Image
              src={image}
              alt=""
              width={200}
              height={500}
              className="xl:hidden w-full max-w-[350px] sm:max-w-[400px] mx-auto h-auto object-cover object-top rounded-30 my-[26px]"
            />

            {/* List of Features */}
            <ul className="mb-10 flex flex-col gap-2.5">
              {items.map((el, i) => (
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

            {/* CTA Button */}
            {buttonText && (
              <FormButton
                href={buttonLink}
                text={buttonText}
                className="bg-white text-primary mx-auto sm:ml-0"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
