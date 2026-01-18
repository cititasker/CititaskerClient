"use client";
import Image from "next/image";
import React from "react";
import { motion, easeOut } from "framer-motion";

interface PosterTestimoniesProps {
  showHeading?: boolean;
}

const STYLES = {
  container: "max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-20",
  header:
    "text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary text-center max-w-2xl mx-auto mb-16",
  grid: "grid lg:grid-cols-3 gap-6 min-h-[400px]",
  testimonialCard:
    "lg:col-span-2 relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer",
  statsCard:
    "bg-gradient-secondary rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1",
  testimonialImage:
    "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
  testimonialOverlay:
    "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent",
  testimonialContent:
    "hidden sm:block absolute bottom-6 left-6 right-6 glass-effect rounded-2xl p-6 md:p-8",
  quote:
    "text-white text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed font-medium mb-4",
  author: "text-white/80 text-sm md:text-base font-medium",
  statsLabel:
    "text-white/90 text-lg md:2xl uppercase tracking-wider font-medium mb-4",
  statsNumber:
    "text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-bold mb-4 leading-none",
  statsDescription:
    "text-white/90 text-base md:text-lg lg:text-xl leading-relaxed",
} as const;

const PosterTestimonies: React.FC<PosterTestimoniesProps> = ({
  showHeading = true,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  const testimonialVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  return (
    <section className={STYLES.container}>
      {/* Header */}
      {showHeading && (
        <motion.h2
          className={STYLES.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Meet our top posters &{" "}
          <span className="text-gradient-primary">their testimonies</span>
        </motion.h2>
      )}

      <motion.div
        className={STYLES.grid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Testimonial Card */}
        <motion.div
          className={STYLES.testimonialCard}
          variants={testimonialVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src="/images/poster_testimony.png"
            alt="Happy CitiTasker customer testimonial"
            width={900}
            height={400}
            className={STYLES.testimonialImage}
            priority={true}
          />

          {/* Overlay */}
          <div className={STYLES.testimonialOverlay} />

          {/* Content */}
          <div className={STYLES.testimonialContent}>
            <motion.p
              className={STYLES.quote}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              "CitiTasker has really helped me with domestic tasks at home. The
              service is reliable and professional."
            </motion.p>
            <motion.p
              className={STYLES.author}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              - Verified CitiTasker Customer
            </motion.p>
          </div>

          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-3xl" />
        </motion.div>

        {/* Stats Card */}
        <motion.div
          className={STYLES.statsCard}
          variants={cardVariants}
          whileHover={{ scale: 1.05, rotate: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative z-10 h-full flex flex-col">
            <motion.p
              className={STYLES.statsLabel}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Facts & Numbers
            </motion.p>

            <div className="mt-auto">
              <motion.h3
                className={STYLES.statsNumber}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
              >
                92%
              </motion.h3>
              <motion.p
                className={STYLES.statsDescription}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                of our customers recommend CitiTasker to friends and family.
              </motion.p>
            </div>

            {/* Floating elements for visual interest */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full animate-pulse" />
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full animate-pulse delay-1000" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PosterTestimonies;
