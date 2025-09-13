"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineArrowRight } from "react-icons/hi";

interface CantFindProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  className?: string;
  variant?: "primary" | "secondary" | "accent";
}

const CantFind: React.FC<CantFindProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  className = "",
  variant = "primary",
}) => {
  const variants = {
    primary: "bg-gradient-primary",
    secondary: "bg-gradient-secondary",
    accent: "bg-gradient-accent",
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className={`relative ${variants[variant]} overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Glow Effects */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000" />

      {/* Content Container */}
      <div className="relative z-10 px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Title */}
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight"
            variants={itemVariants}
          >
            {title}
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {description}
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <Link href={buttonLink}>
              <motion.button
                className="group inline-flex items-center gap-3 bg-white text-primary hover:bg-white/95 px-8 py-4 rounded-2xl font-bold text-base md:text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{buttonText}</span>
                <HiOutlineArrowRight className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="flex justify-center gap-2 mt-12"
            variants={itemVariants}
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-white/40 animate-pulse"
                style={{ animationDelay: `${index * 0.2}s` }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </motion.section>
  );
};

export default CantFind;
