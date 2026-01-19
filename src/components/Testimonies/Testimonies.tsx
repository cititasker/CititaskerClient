"use client";
import Image from "next/image";
import React from "react";
import { easeOut, motion } from "framer-motion";
import SectionHeader from "../reusables/SectionHeader";
import dynamic from "next/dynamic";

const TestimonialCarousel = dynamic(() => import("./TestimonialCarousel"));

const STYLES = {
  container: "mx-auto px-4 md:px-8 py-8 md:py-20",
  cardContainer:
    "relative rounded-2xl overflow-hidden bg-primary-500 shadow-md",
  contentWrapper: "relative z-10 py-12 md:py-20 px-6 md:px-12",
  decorativeShape: "absolute w-auto h-16 md:h-48 opacity-20",
} as const;

const Testimonies: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  return (
    <section className={STYLES.container}>
      <motion.div
        className={STYLES.cardContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
      >
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-emerald-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Decorative Shape */}
        <Image
          src="/images/dotted_shape.svg"
          alt=""
          width={208}
          height={280}
          className={`${STYLES.decorativeShape} -top-4 -left-4 md:-top-16 md:-left-16`}
          priority={false}
        />

        <div className={STYLES.contentWrapper}>
          {/* Title */}
          <SectionHeader
            title={
              <h2 className="text-white">
                What Our Happy Customers Are Saying
              </h2>
            }
            className="max-w-[700px] mx-auto w-full"
          />

          {/* Testimonial Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <TestimonialCarousel />
          </motion.div>
        </div>

        {/* Bottom Accent Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Testimonies;
