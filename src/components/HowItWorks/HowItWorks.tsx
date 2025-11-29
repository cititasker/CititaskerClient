"use client";
import React from "react";
import HowItWorksListItem from "./HowItWorksListItem";
import { motion } from "framer-motion";
import SectionHeader from "../reusables/SectionHeader";
import dynamic from "next/dynamic";

const SlidingImageCarousel = dynamic(() => import("./SlidingImageCarousel"), {
  ssr: false,
});

const data = [
  {
    id: "1",
    title: "Post your tasks for FREE",
    text: "Tell us what you need and start receiving offers in minutes.",
  },
  {
    id: "2",
    title: "Offers come to you",
    text: "Get offers from trusted Taskers and assign the best tasker to the job by reviewing their profiles. ",
  },
  {
    id: "3",
    title: "Get it done",
    text: "Tasker completes the task, you release payment a give a review. ",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const HowItWorks = () => {
  return (
    <div className="container-w bg-white sm:py-[5.125rem]" id="how_it_works">
      {/* Header */}
      <SectionHeader
        title={
          <h2>
            How does <span className="text-gradient-primary">Cititasker</span>{" "}
            work?
          </h2>
        }
        subtitle="CitiTasker connects you with verified Taskers to get your tasks done
          effortlessly. Here's how it works:"
      />

      <div className="max-w-[74rem]  mx-auto gap-x-5 flex justify-between items-center flex-col xl:flex-row">
        <SlidingImageCarousel />
        <motion.div
          className="max-w-full xl:max-w-[31.25rem] xl:mt-0 space-y-4 mt-[4.25rem]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {data.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <HowItWorksListItem data={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;
