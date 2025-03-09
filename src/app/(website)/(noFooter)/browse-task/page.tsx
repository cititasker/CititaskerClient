"use client";
import Map from "@/components/browseTask/Map";
import React from "react";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="w-full h-full"
    >
      <Map />
    </motion.div>
  );
}
