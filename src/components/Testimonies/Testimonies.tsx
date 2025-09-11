"use client";
import Image from "next/image";
import React from "react";
import TestimonialCarousel from "./TestimonialCarousel";
import { motion } from "framer-motion";

const STYLES = {
  container: "mx-auto px-4 md:px-8 py-8 md:py-20",
  cardContainer:
    "relative rounded-3xl md:rounded-[3.125rem] overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 shadow-2xl",
  backgroundPattern:
    'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')]',
  contentWrapper: "relative z-10 py-12 md:py-20 px-6 md:px-12",
  decorativeShape: "absolute w-auto h-16 md:h-48 opacity-20",
  title:
    "max-w-2xl md:max-w-4xl mx-auto text-center text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight md:leading-snug mb-12 md:mb-16",
  glowEffect:
    "absolute -top-40 -right-40 w-80 h-80 bg-gradient-primary opacity-20 rounded-full blur-3xl animate-pulse",
} as const;

const Testimonies: React.FC = () => {
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
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
        {/* Background Pattern */}
        <div className={STYLES.backgroundPattern} />

        {/* Glow Effects */}
        <div className={STYLES.glowEffect} />
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
          <motion.h1 className={STYLES.title} variants={titleVariants}>
            See what{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text">
              happy customers
            </span>{" "}
            are saying about CitiTasker
          </motion.h1>

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
