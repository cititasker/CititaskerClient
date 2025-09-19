"use client";

import React from "react";
import { Shield, CheckCircle } from "lucide-react";

import BaseVerificationModal from "./BaseVerificationModal";
import DojahVerification from "@/components/DojahVerification";
import ExtraInfo from "@/components/forms/ExtraInfo";

interface IDVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleSuccess: (res: any) => void;
  user: Partial<IUser>;
}

const VERIFICATION_REQUIREMENTS = [
  "A government-issued photo ID (Driver's License, Passport, or National ID)",
  "Clear, well-lit photos of your documents",
  "Your face should be clearly visible and match your ID",
  "Documents should be valid and not expired",
  "Utility bill no older than 6 months",
];

const RequirementsList = () => (
  <div className="space-y-4">
    <h3 className="font-semibold text-text-primary flex items-center gap-2">
      <CheckCircle className="w-5 h-5 text-success" />
      You'll need the following:
    </h3>

    <ul className="space-y-3">
      {VERIFICATION_REQUIREMENTS.map((requirement, index) => (
        <li key={index} className="flex items-start gap-3">
          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
          <span className="text-sm text-text-secondary leading-relaxed">
            {requirement}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

const IDVerificationModal: React.FC<IDVerificationModalProps> = ({
  isOpen,
  onClose,
  handleSuccess,
  user,
}) => {
  return (
    <BaseVerificationModal
      isOpen={isOpen}
      onClose={onClose}
      title="Verify Your Identity"
      description="Secure your account with identity verification to access all CitiTasker features"
      icon={<Shield className="w-8 h-8 text-primary" />}
    >
      <div className="space-y-6">
        {/* Requirements List */}
        <RequirementsList />

        {/* Security Notice */}
        <ExtraInfo type="info" compact>
          <div className="space-y-2">
            <p className="font-medium">Your privacy is protected</p>
            <p className="text-sm">
              All documents are encrypted and used solely for verification. We
              never store or share your personal information.
            </p>
          </div>
        </ExtraInfo>

        {/* Verification Button */}
        <div className="pt-2">
          <DojahVerification
            text="Start Identity Verification"
            user={user}
            className="w-full btn-primary font-semibold py-3 rounded-xl"
            handleSuccess={handleSuccess}
          />
        </div>
      </div>
    </BaseVerificationModal>
  );
};

export default IDVerificationModal;
