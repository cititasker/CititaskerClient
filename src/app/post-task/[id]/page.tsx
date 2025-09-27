"use client";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/store/hook";
import StepOne from "../_components/StepOne";
import StepTwo from "../_components/StepTwo";
import StepThree from "../_components/StepThree";
import StepFour from "../_components/StepFour";
import Summary from "../_components/Summary";

// Simplified animation variants
const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const stepComponents = {
  1: StepOne,
  2: StepTwo,
  3: StepThree,
  4: StepFour,
  5: Summary,
} as const;

function PostTaskPage() {
  const searchParams = useSearchParams();
  const step = parseInt(
    searchParams.get("step") || "1"
  ) as keyof typeof stepComponents;
  const { isDataLoaded } = useAppSelector((state) => state.task);

  const StepComponent = stepComponents[step] || StepOne;

  // Show loading state until data is loaded for existing tasks
  if (!isDataLoaded && searchParams.has("id")) {
    return <PostTaskPageSkeleton />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`step-${step}`}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <StepComponent />
      </motion.div>
    </AnimatePresence>
  );
}

// Skeleton component for better UX
const PostTaskPageSkeleton = () => (
  <div className="space-y-6">
    <div className="h-8 bg-gray-200 rounded animate-pulse" />
    <div className="space-y-4">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
      ))}
    </div>
  </div>
);

// Wrap in Suspense for better error handling
export default function Page() {
  return (
    <Suspense fallback={<PostTaskPageSkeleton />}>
      <PostTaskPage />
    </Suspense>
  );
}
