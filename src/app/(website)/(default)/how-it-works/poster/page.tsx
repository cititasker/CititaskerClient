"use client";
import TaskerBanner from "@/components/tasker/TaskerBanner";
import React from "react";
import Hero from "./_components/Hero";
import HowItWorks from "./_components/HowItWorks";
import WhyCitiTasker from "./_components/WhyCitiTasker/WhyCitiTasker";
import WeLoveTodos from "./_components/WeLoveTodos";
import Faq from "../_components/Faq";
import { accordionData } from "data";

export default function Page() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <WhyCitiTasker />
      <WeLoveTodos />
      <TaskerBanner />
      <Faq accordionData={accordionData} />
    </div>
  );
}
