"use client";
import React, { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import StepOne from "./_components/StepOne";
import StepTwo from "./_components/StepTwo";
import StepThree from "./_components/StepThree";
import StepFour from "./_components/StepFour";
import StepFive from "./_components/StepFive";
import { ROUTES } from "@/constant";

// Step configuration
const stepConfig = {
  1: { component: StepOne, title: "Create Account" },
  2: { component: StepTwo, title: "Verify Email" },
  3: { component: StepThree, title: "Add Phone" },
  4: { component: StepFour, title: "Verify Phone" },
  5: { component: StepFive, title: "Complete Profile" },
};

// Improved SignUp Page - much cleaner

const SignUpPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const role = searchParams.get("role");
  const currentStep = useMemo(
    () => Math.max(1, Math.min(5, Number(searchParams.get("step")) || 1)),
    [searchParams]
  );

  // Redirect if no role
  useEffect(() => {
    if (!role) {
      redirect(ROUTES.CREATE_ACCOUNT);
      return;
    }

    // Add step to URL if missing
    if (!searchParams.get("step")) {
      const url = new URL(window.location.href);
      url.searchParams.set("step", "1");
      router.replace(url.toString());
    }
  }, [role, router, searchParams]);

  // Navigate to next step
  const handleNextStep = () => {
    if (currentStep < 5) {
      const url = new URL(window.location.href);
      url.searchParams.set("step", String(currentStep + 1));
      router.push(url.toString());
    }
  };

  // Get current step component and title
  const stepData = stepConfig[currentStep as keyof typeof stepConfig];

  if (!stepData) {
    redirect(ROUTES.CREATE_ACCOUNT);
    return null;
  }

  const { component: StepComponent, title } = stepData;

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress Bar */}
      {/* <ProgressBar currentStep={currentStep} totalSteps={5} /> */}

      {/* Step Title */}
      <motion.div
        key={`title-${currentStep}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl font-semibold text-text-primary mb-2">
          {title}
        </h1>
        <p className="text-text-secondary">
          Complete this step to continue with your account setup
        </p>
      </motion.div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <StepComponent onNext={currentStep < 5 ? handleNextStep : undefined} />
      </AnimatePresence>
    </div>
  );
};

export default SignUpPage;
