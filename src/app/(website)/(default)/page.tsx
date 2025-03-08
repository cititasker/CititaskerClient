import BecomeTaskerBanner from "@/components/BecomeTaskerBanner";
import Faq from "@/components/Faq";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import LandingPageHero from "@/components/LandingPageHero";
import PopularTasks from "@/components/PopularTasks/PopularTasks";
import Stats from "@/components/Stats";
import TaskCategories from "@/components/TaskCategories/TaskCategories";
import Testimonies from "@/components/Testimonies/Testimonies";
import WhyChooseCitiTasker from "@/components/WhyChooseCitiTasker/WhyChooseCitiTasker";
import React from "react";

const page = () => {
  return (
    <div>
      <LandingPageHero />
      <TaskCategories />
      <WhyChooseCitiTasker />
      <HowItWorks />
      <PopularTasks />
      <Stats />
      <Testimonies />
      <Faq />
      <BecomeTaskerBanner />
    </div>
  );
};

export default page;
