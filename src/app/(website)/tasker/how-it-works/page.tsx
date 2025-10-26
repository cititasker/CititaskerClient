"use client";
import React from "react";
import Hero from "./_components/Hero/Hero";
import Testimonies from "./_components/Testimonies/Testimonies";
import { taskerAccordionData } from "data";
import StepFlow from "@/components/shared/components/StepFlow";
import { sections, steps, taskerFeatures } from "./constants/data";
import BannerSection from "@/components/shared/components/BannerSection";
import BannerLeftImage from "@/assets/images/how_it_works/banner_left_img.svg?url";
import FeatureShowcase from "@/components/shared/components/FeatureShowcase/FeatureShowcase";
import FAQ from "@/components/shared/FAQ";

export default function Page() {
  return (
    <div>
      <Hero />
      <StepFlow
        title="How to get started with"
        highlightedText="CitiTasker"
        items={steps}
      />
      <FeatureShowcase
        title="Why you should post your next task on CitiTasker"
        subtitle="Getting things done has never been easier. CitiTasker simplifies the process of finding help for your tasks, offering a secure and reliable platform to connect with trusted Taskers."
        features={sections}
        variant="poster"
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
      <FAQ accordionData={taskerAccordionData} />
    </div>
  );
}
