"use client";

import React, { useMemo } from "react";
import { AlertCircle } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/constant";
import ProgressBar from "@/components/auth/ProgressBar";
import { verificationConfig, VerificationStep } from "./constant";
import { VerificationStepCard } from "./VerificationStepCard";
import BaseModal from "@/components/browseTask/Modals/BaseModal";

interface VerificationModalProps {
  open: boolean;
  onClose: () => void;
  verifications: {
    id: boolean;
    bank: boolean;
    profile: boolean;
  };
}

const AlertMessage = () => (
  <div className="flex items-start gap-3 p-4 bg-warning-light rounded-lg border border-warning/20">
    <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
    <div className="space-y-1">
      <h4 className="font-medium text-text-primary">Verification Required</h4>
      <p className="text-sm text-text-secondary">
        You need to complete all verification steps before you can make offers
        on tasks.
      </p>
    </div>
  </div>
);

const VerificationModal: React.FC<VerificationModalProps> = ({
  open,
  onClose,
  verifications,
}) => {
  const verificationSteps = useMemo<VerificationStep[]>(() => {
    return Object.entries(verificationConfig).map(([key, config]) => ({
      key: key as keyof typeof verificationConfig,
      completed: verifications[key as keyof typeof verifications],
      href: `/tasker/${ROUTES.DASHBOARD_ACCOUNT}?tab=verifications&type=${key}`,
      ...config,
    }));
  }, [verifications]);

  const completedCount = verificationSteps.filter(
    (step) => step.completed
  ).length;
  const totalCount = verificationSteps.length;
  const allCompleted = completedCount === totalCount;

  return (
    <BaseModal
      isOpen={open}
      onClose={onClose}
      title="Verify Your Account"
      description="Complete these steps to start making offers on tasks"
      className="max-w-lg mx-auto"
    >
      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="hidden sm:block">
          <ProgressBar currentStep={completedCount} totalSteps={totalCount} />
        </div>

        <Separator />

        {/* Alert Message */}
        {!allCompleted && <AlertMessage />}

        {/* Verification Steps */}
        <div className="space-y-4">
          {verificationSteps.map((step, index) => (
            <VerificationStepCard key={index} step={step} />
          ))}
        </div>
      </div>
    </BaseModal>
  );
};

export default VerificationModal;
