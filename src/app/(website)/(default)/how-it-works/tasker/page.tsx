"use client";
import React from "react";
import Hero from "./_components/Hero/Hero";
import Testimonies from "./_components/Testimonies/Testimonies";
import { taskerAccordionData } from "data";
import StepFlow from "@/components/shared/components/StepFlow";
import { sections, steps, taskerFeatures } from "./constants/data";
import WhyCitiTasker from "@/components/shared/components/WhyCitiTasker";
import BannerSection from "@/components/shared/components/BannerSection";
import BannerLeftImage from "@/assets/images/how_it_works/banner_left_img.svg?url";
import Faq from "@/components/shared/components/Faq";

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
        highlightedText="CitiTasker"
        subtitle="CitiTasker is the ultimate platform for people looking to turn their
            skills into income."
        features={sections}
      />
      <Testimonies />
      <BannerSection
        title="Earn up to ₦500,000 a month helping others with their tasks on CitiTasker"
        image={BannerLeftImage}
        items={taskerFeatures}
        buttonText="Earn on CitiTasker"
        buttonLink="/tasker/signup"
        bgImage="/images/bg_secondary_mobile.svg"
      />
      <Faq accordionData={taskerAccordionData} />
    </div>
  );
}
