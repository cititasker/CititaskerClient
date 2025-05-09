"use client";
import React from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export default function SuccessConfetti() {
  const { width, height } = useWindowSize();
  return <Confetti width={width} height={height} />;
}
