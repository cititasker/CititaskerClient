"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BrowseCategoryCarousel from "./BrowseCategoryCarousel";

const BrowseCategories: React.FC = () => {
  return (
    <section className="bg-background">
      <div className="container-w py-12 md:py-16">
        <motion.div
          className="relative bg-primary-500 rounded-3xl md:rounded-[3.75rem] px-6 py-12 md:px-8 md:py-16 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Glow Effects */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000" />

          {/* Header Section */}
          <motion.div
            className="max-w-2xl mx-auto text-center mb-12 md:mb-16 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Popular Categories
            </h2>
            <p className="text-lg md:text-xl text-white/90 font-medium">
              Explore the top categories and choose the tasks you love
            </p>
          </motion.div>

          {/* Carousel Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <BrowseCategoryCarousel />
          </motion.div>

          {/* Decorative Curl */}
          <motion.div
            className="absolute top-[8%] left-[5%] w-32 h-16 md:w-48 md:h-24 opacity-60 hidden md:block"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/icons/curl.svg"
              alt=""
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Bottom Accent Line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default BrowseCategories;
