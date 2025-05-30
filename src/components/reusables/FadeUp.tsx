"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/utils";

interface IProps {
  className?: string;
  children: React.ReactNode;
  hidden?: any;
  exit?: any;
  visible?: any;
  transition?: {
    delay?: number;
    duration: number;
  };
}

const FadeUp = ({
  children,
  hidden = { opacity: 0, y: 20 },
  visible = { opacity: 1, y: 0 },
  transition = { duration: 0.5 },
  exit = { opacity: 0, y: -20 },
  className,
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
        exit: exit,
      }}
      initial="hidden"
      exit="exit"
      animate={mainControls}
      transition={{ ...transition }}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  );
};

export default FadeUp;
