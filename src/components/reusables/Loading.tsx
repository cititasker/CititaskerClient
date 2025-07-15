"use client";
import React from "react";
import Animation from "@/../public/loader.json";
import Lottie from "lottie-react";

const Loader = () => {
  return (
    <div className="w-full h-dvh flex items-center justify-center z-[9999] bg-white fixed top-0 left-0">
      <Lottie animationData={Animation} loop={true} className="w-[160px]" />
    </div>
  );
};

export default Loader;
