"use client";
import TaskerBanner from "@/components/tasker/TaskerBanner";
import React from "react";
import WhyCitiTasker from "./_components/WhyCitiTasker/WhyCitiTasker";
import HowItWorks from "./_components/HowItWorks";
import Hero from "./_components/Hero/Hero";
import Testimonies from "./_components/Testimonies/Testimonies";
import Faq from "../_components/Faq";
import { taskerAccordionData } from "data";

export default function Page() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <WhyCitiTasker />
      <Testimonies />
      <TaskerBanner />
      <Faq accordionData={taskerAccordionData} />
    </div>
  );
}
