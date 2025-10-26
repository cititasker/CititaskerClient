"use client";
import React from "react";
import Hero from "./_components/Hero";
import WeLoveTodos from "./_components/WeLoveTodos";
import FAQ from "../../../../components/shared/components/FAQ";
import StepFlow from "@/components/shared/components/StepFlow";
import { posterFeatures, sections, steps } from "./constants/data";
import BannerSection from "@/components/shared/components/BannerSection";
import BannerLeftImage from "@/assets/images/how_it_works/banner_left_img.svg?url";
import { accordionDataWithHTML } from "data";
import FeatureShowcase from "@/components/shared/components/FeatureShowcase/FeatureShowcase";

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
      {/* <WeLoveTodos /> */}
      <BannerSection
        title="Earn up to ₦500,000 a month helping others with their tasks on CitiTasker"
        image={BannerLeftImage}
        items={posterFeatures}
        buttonText="Earn on CitiTasker"
        buttonLink="/tasker/signup"
        bgImage="/images/bg_secondary_mobile.svg"
      />
      <FAQ accordionData={accordionDataWithHTML} />
    </div>
  );
}
