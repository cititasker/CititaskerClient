import BrowseCategories from "@/components/poster/landingPage/BrowseCategories/BrowseCategories";
import FeaturedTasks from "@/components/poster/landingPage/FeaturedTasks";
import NotFound from "@/components/poster/landingPage/NotFound";
import PopularCategories from "@/components/poster/landingPage/PopularCategories";
import PosterTestimonies from "@/components/poster/landingPage/PosterTestimonies";
import PromotionBanner from "@/components/poster/landingPage/PromotionBanner";
import Recommended from "@/components/poster/landingPage/Recommended";
import Search from "@/components/Search";
import React from "react";

const Page = () => {
  return (
    <main className="">
      <div className="bg-light-primary-1">
        <div className="container pt-[133px] pb-[3.625rem]">
          <div className="pb-[70px] relative">
            <PromotionBanner />
            <Search extraClass="mx-auto absolute bottom-[38px] left-1/2 -translate-x-1/2" />
          </div>
          <PopularCategories />
        </div>
      </div>
      <div className="py-[3.875rem]">
        <Recommended />
        <FeaturedTasks />
      </div>
      <BrowseCategories />
      <NotFound />
      <PosterTestimonies />
    </main>
  );
};

export default Page;
