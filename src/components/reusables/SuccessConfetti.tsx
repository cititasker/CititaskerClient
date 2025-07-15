"use client";
import React from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export default function SuccessConfetti() {
  const { width, height } = useWindowSize();
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[60] pointer-events-none">
      <Confetti width={width} height={height} />
    </div>
  );
}
