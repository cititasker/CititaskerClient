import React from "react";
import { easeOut, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface IProps {
  title: string | React.ReactNode;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export default function SectionHeader({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
}: IProps) {
  return (
    <motion.div
      className={cn("text-center mb-8 sm:mb-12 md:mb-20 mx-auto", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.div
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold",
          titleClassName,
        )}
        variants={itemVariants}
      >
        {title}
      </motion.div>
      {subtitle && (
        <motion.p
          className={cn(
            "sm:text-lg md:text-xl text-black-2 max-w-2xl mx-auto mt-2 sm:mt-4",
            subtitleClassName,
          )}
          variants={itemVariants}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
