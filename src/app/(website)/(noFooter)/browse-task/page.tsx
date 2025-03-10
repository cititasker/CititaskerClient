"use client";
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/browseTask/Map"), {
  ssr: false,
});

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
