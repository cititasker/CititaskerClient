import BrowseCategories from "@/components/poster/landingPage/BrowseCategories/BrowseCategories";
import FeaturedTasks from "@/components/poster/landingPage/FeaturedTasks";
import NotFound from "@/components/poster/landingPage/NotFound";
import PromotionBanner from "@/components/poster/landingPage/PromotionBanner";
import Recommended from "@/components/poster/landingPage/Recommended";
import React from "react";

export default function Page() {
  return (
    <main className="bg-light-primary-1">
      <div className="container pt-[133px] pb-0">
        <PromotionBanner />
        {/* <Search extraClass="mx-auto absolute bottom-[38px] left-1/2 -translate-x-1/2" /> */}
        {/* <PopularCategories /> */}
      </div>
      <div className="py-[3.875rem]">
        <Recommended />
        <FeaturedTasks />
      </div>
      <BrowseCategories />
      <NotFound />
      {/* <PosterTestimonies /> */}
    </main>
  );
}
