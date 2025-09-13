import BrowseCategories from "@/components/poster/landingPage/BrowseCategories/BrowseCategories";
import FeaturedTasks from "@/components/poster/landingPage/FeaturedTasks";
import PromotionBanner from "@/components/poster/landingPage/PromotionBanner";
import Recommended from "@/components/poster/landingPage/Recommended";
import CantFind from "@/components/posterDiscovery/CantFind";
import { ROUTES } from "@/constant";
import React from "react";

export default function Page() {
  return (
    <main className="bg-primary-50">
      <div className="container-w pt-[100px] sm:pt-[133px] pb-0">
        <PromotionBanner />
      </div>
      <div>
        <Recommended />
        {/* <FeaturedTasks /> */}
      </div>
      <BrowseCategories />
      <CantFind
        title="Can't find the task you want?"
        description="No worries! There are many tasks that deserve your skills on CitiTasker."
        buttonText="Browse Task"
        buttonLink={ROUTES.BROWSE_TASK}
        className="min-h-[247px]"
      />
    </main>
  );
}
