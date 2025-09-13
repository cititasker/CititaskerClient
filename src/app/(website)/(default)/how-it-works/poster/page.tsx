"use client";
import React from "react";
import Hero from "./_components/Hero";
import WeLoveTodos from "./_components/WeLoveTodos";
import Faq from "../../../../../components/shared/components/Faq";
import { accordionData } from "data";
import StepFlow from "@/components/shared/components/StepFlow";
import { posterFeatures, sections, steps } from "./constants/data";
import WhyCitiTasker from "@/components/shared/components/WhyCitiTasker";
import BannerSection from "@/components/shared/components/BannerSection";
import BannerLeftImage from "@/assets/images/how_it_works/banner_left_img.svg?url";

export default function Page() {
  return (
    <div>
      <Hero />
      <StepFlow
        title="How to get started with"
        highlightedText="CitiTasker"
        items={steps}
      />
      <WhyCitiTasker
        title="Why you should post your next task on"
        subtitle="Getting things done has never been easier. CitiTasker simplifies the
            process of finding help for your tasks, offering a secure and
            reliable platform to connect with trusted Taskers."
        features={sections}
      />
      <WeLoveTodos />
      <BannerSection
        title="Earn up to ₦500,000 a month helping others with their tasks on CitiTasker"
        image={BannerLeftImage}
        items={posterFeatures}
        buttonText="Earn on CitiTasker"
        buttonLink="/tasker/signup"
        bgImage="/images/bg_secondary_mobile.svg"
      />
      <Faq accordionData={accordionData} />
    </div>
  );
}
