"use client";

import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Suspense, lazy } from "react";
import { useAppSelector } from "@/store/hook";

// Skeleton component
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

// Lazy load Framer Motion
const MotionDiv = lazy(() =>
  import("framer-motion").then((mod) => ({
    default: mod.motion.div,
  })),
);

const AnimatePresence = lazy(() =>
  import("framer-motion").then((mod) => ({
    default: mod.AnimatePresence,
  })),
);

// Dynamic imports for step components with loading states
const StepOne = dynamic(() => import("@/components/poster/post-task/StepOne"), {
  loading: () => <PostTaskPageSkeleton />,
});
const StepTwo = dynamic(() => import("@/components/poster/post-task/StepTwo"), {
  loading: () => <PostTaskPageSkeleton />,
});
const StepThree = dynamic(
  () => import("@/components/poster/post-task/StepThree"),
  {
    loading: () => <PostTaskPageSkeleton />,
  },
);
const StepFour = dynamic(
  () => import("@/components/poster/post-task/StepFour"),
  {
    loading: () => <PostTaskPageSkeleton />,
  },
);
const Summary = dynamic(() => import("@/components/poster/post-task/Summary"), {
  loading: () => <PostTaskPageSkeleton />,
});

const stepComponents = {
  1: StepOne,
  2: StepTwo,
  3: StepThree,
  4: StepFour,
  5: Summary,
} as const;

const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

function PostTaskPage() {
  const searchParams = useSearchParams();
  const step = parseInt(
    searchParams.get("step") || "1",
  ) as keyof typeof stepComponents;
  const { isDataLoaded } = useAppSelector((state) => state.task);

  const StepComponent = stepComponents[step] || StepOne;

  if (!isDataLoaded && searchParams.has("id")) {
    return <PostTaskPageSkeleton />;
  }

  return (
    <Suspense fallback={<PostTaskPageSkeleton />}>
      <AnimatePresence mode="wait">
        <MotionDiv
          key={`step-${step}`}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex flex-col h-full"
        >
          <StepComponent />
        </MotionDiv>
      </AnimatePresence>
    </Suspense>
  );
}

export default function Page() {
  return <PostTaskPage />;
}
