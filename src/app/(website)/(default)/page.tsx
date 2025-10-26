import BecomeTaskerBanner from "@/components/BecomeTaskerBanner";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import LandingPageHero from "@/components/LandingPageHero";
import PopularTasks from "@/components/PopularTasks/PopularTasks";
import PosterTestimonies from "@/components/poster/landingPage/PosterTestimonies";
import FAQ from "@/components/shared/components/FAQ";
import Stats from "@/components/Stats";
import TaskCategories from "@/components/TaskCategories/TaskCategories";
import Testimonies from "@/components/Testimonies/Testimonies";
import WhyChooseCitiTasker from "@/components/WhyChooseCitiTasker/WhyChooseCitiTasker";
import { accordionDataWithHTML } from "data";
import React from "react";

export default function Page() {
  return (
    <div>
      <LandingPageHero />
      <TaskCategories />
      <WhyChooseCitiTasker />
      <HowItWorks />
      <PopularTasks />
      <Stats />
      <Testimonies />
      <PosterTestimonies showHeading={false} />
      <FAQ accordionData={accordionDataWithHTML} />
      <BecomeTaskerBanner />
    </div>
  );
}
