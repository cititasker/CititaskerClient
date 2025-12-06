"use client";
import React, { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constant";
import dynamic from "next/dynamic";
import Loader from "@/components/reusables/Loading";

// Dynamic imports
const StepOne = dynamic(() => import("./_components/StepOne"), {
  ssr: false,
  loading: () => <Loader />,
});

const StepTwo = dynamic(() => import("./_components/StepTwo"), {
  ssr: false,
  loading: () => <Loader />,
});

const StepThree = dynamic(() => import("./_components/StepThree"), {
  ssr: false,
  loading: () => <Loader />,
});

const StepFour = dynamic(() => import("./_components/StepFour"), {
  ssr: false,
  loading: () => <Loader />,
});

const StepFive = dynamic(() => import("./_components/StepFive"), {
  ssr: false,
  loading: () => <Loader />,
});

// Prefetch map for modules
const prefetchMap = {
  1: () => import("./_components/StepTwo"),
  2: () => import("./_components/StepThree"),
  3: () => import("./_components/StepFour"),
  4: () => import("./_components/StepFive"),
} as const;

// Step configuration
const stepConfig = {
  1: { component: StepOne, title: "Create Account" },
  2: { component: StepTwo, title: "Verify Email" },
  3: { component: StepThree, title: "Add Phone" },
  4: { component: StepFour, title: "Verify Phone" },
  5: { component: StepFive, title: "Complete Profile" },
} as const;

const SignUpPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const role = searchParams.get("role");
  const currentStep = useMemo(
    () => Math.max(1, Math.min(5, Number(searchParams.get("step")) || 1)),
    [searchParams]
  );

  // Handle role and step validation
  useEffect(() => {
    if (!role) {
      redirect(ROUTES.CREATE_ACCOUNT);
      return;
    }

    if (!searchParams.get("step")) {
      const url = new URL(window.location.href);
      url.searchParams.set("step", "1");
      router.replace(url.toString());
    }
  }, [role, router, searchParams]);

  // Prefetch next step
  useEffect(() => {
    const prefetchFn = prefetchMap[currentStep as keyof typeof prefetchMap];
    if (prefetchFn) {
      // Prefetch after a slight delay to not block current step rendering
      const timeoutId = setTimeout(() => {
        prefetchFn().catch(console.error);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [currentStep]);

  const handleNextStep = () => {
    if (currentStep < 5) {
      const url = new URL(window.location.href);
      url.searchParams.set("step", String(currentStep + 1));
      router.push(url.toString());
    }
  };

  const stepData = stepConfig[currentStep as keyof typeof stepConfig];

  if (!stepData) {
    redirect(ROUTES.CREATE_ACCOUNT);
    return null;
  }

  const { component: StepComponent, title } = stepData;

  return (
    <div className="max-w-xl mx-auto">
      {/* Step Title */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-2xl font-semibold text-text-primary mb-2">
          {title}
        </h1>
        <p className="text-text-secondary">
          Complete this step to continue with your account setup
        </p>
      </div>

      {/* Step Content */}
      <StepComponent onNext={currentStep < 5 ? handleNextStep : undefined} />
    </div>
  );
};

export default SignUpPage;
