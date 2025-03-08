"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/utils";

interface IProps {
  extraClass?: string;
  children: React.ReactNode;
  hidden?: {};
  visible?: {};
  transition?: {
    delay?: number;
    duration: number;
  };
}

const FadeUp = ({
  children,
  hidden = { opacity: 0, y: 75 },
  visible = { opacity: 1, y: 0 },
  transition = { duration: 0.5 },
  extraClass,
}: IProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: hidden,
        visible: visible,
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ ...transition }}
      className={cn("", extraClass)}
    >
      {children}
    </motion.div>
  );
};

export default FadeUp;
