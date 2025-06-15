import BrowseCategories from "@/components/poster/landingPage/BrowseCategories/BrowseCategories";
import FeaturedTasks from "@/components/poster/landingPage/FeaturedTasks";
import PromotionBanner from "@/components/poster/landingPage/PromotionBanner";
import Recommended from "@/components/poster/landingPage/Recommended";
import CantFind from "@/components/posterDiscovery/CantFind";
import { ROUTES } from "@/constant";
import React from "react";

export default function Page() {
  return (
    <main className="bg-light-primary-1">
      <div className="container pt-[133px] pb-0">
        <PromotionBanner />
      </div>
      <div className="py-[3.875rem]">
        <Recommended />
        <FeaturedTasks />
      </div>
      <BrowseCategories />
       <CantFind
      title="Can’t find the task you want?"
      description="No worries! There are many tasks that deserve your skills on CitiTasker."
      buttonText="Browse Task"
      buttonLink={ROUTES.BROWSE_TASK}
      className="min-h-[247px]" 
    />
    </main>
  );
}
