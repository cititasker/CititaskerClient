"use client";
import Faq from "@/components/Faq";
import Hero from "@/components/tasker/Hero/Hero";
import HowItWorks from "@/components/tasker/HowItWorks/HowItWorks";
import TaskByCategory from "@/components/tasker/TaskByCategory/TaskByCategory";
import TaskerBanner from "@/components/tasker/TaskerBanner";
import Testimonies from "@/components/tasker/Testimonies/Testimonies";
import WhyCitiTasker from "@/components/tasker/WhyCitiTasker/WhyCitiTasker";
import React from "react";

const Page = () => {
  return (
    <div>
      <Hero />
      <TaskByCategory />
      <HowItWorks />
      <WhyCitiTasker />
      <Testimonies />
      <Faq />
      <TaskerBanner />
    </div>
  );
};

export default Page;
