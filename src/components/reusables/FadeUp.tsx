"use client";
import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView, easeInOut } from "framer-motion";
import { cn } from "@/utils";

interface FadeUpProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
}

const FadeUp: React.FC<FadeUpProps> = ({
  children,
  className,
  delay = 0,
  duration = 0.6,
  distance = 30,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const variants = {
    hidden: { opacity: 0, y: distance, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: easeInOut, // ✅ fixed
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
};

export default FadeUp;
