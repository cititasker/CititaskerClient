"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BrowseCategoryCarousel from "./BrowseCategoryCarousel";

const BrowseCategories: React.FC = () => {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="container-w">
        <motion.div
          className="relative bg-gradient-primary rounded-3xl md:rounded-[3.75rem] px-6 py-12 md:px-8 md:py-16 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Cpath d=%22M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />

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
