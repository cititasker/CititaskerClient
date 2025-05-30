// components/StepWrapper.tsx
import { motion } from "framer-motion";
import React from "react";

const StepWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className="lg:shadow-sm mt-[40px] md:-mt-[3.5rem] max-w-[31.25rem] h-fit w-full mx-auto sm:bg-white rounded-30 px-0 sm:px-5 xl:px-[4.875rem] lg:py-[3.125rem] overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);

export default StepWrapper;
