import React from "react";
import BrowseCategoryCarousel from "./BrowseCategoryCarousel";
import Image from "next/image";

const BrowseCategories = () => {
  return (
    <div className="bg-light-primary-1">
      <div className="container pb-[5.75rem] pt-[4.375rem]">
        <div className="relative bg-primary pt-[2.875rem] pb-[5.375rem] rounded-[3.75rem]">
          <div className="max-w-[36.75rem] mx-auto w-full mb-10">
            <h2 className="header text-white mb-3">Popular categories</h2>
            <p className="sub_header">
              Explore the top categories  and choose the tasks you love
            </p>
          </div>
          <BrowseCategoryCarousel />
          <Image
            src="/icons/curl.svg"
            alt=""
            width={193}
            height={97}
            className="absolute top-[8%] left-[5%] w-[193px] h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default BrowseCategories;
