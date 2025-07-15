import CantFind from "@/components/posterDiscovery/CantFind";
import BecomeBanner from "@/components/posterDiscovery/BecomeBanner";
import Hero from "@/components/posterDiscovery/Hero";
import React from "react";
import TaskCategorySelector from "@/components/posterDiscovery/TaskCategorySelector";
import PopularTasksCarousel from "@/components/posterDiscovery/PopularTaskCarousel";
import { ROUTES } from "@/constant";
export default function page() {
  return (
    <div>
      <Hero />
      <TaskCategorySelector />
      <PopularTasksCarousel />
      <BecomeBanner />
      <CantFind
        title="Can’t find what you need?"
        description="You can count on CitiTasker to get you the help that you need."
        buttonText="Post a task & get offers"
        buttonLink={ROUTES.POST_TASK}
      />
    </div>
  );
}
