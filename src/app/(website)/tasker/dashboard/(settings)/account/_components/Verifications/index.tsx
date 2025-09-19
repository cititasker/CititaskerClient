"use client";

import React from "react";
import { Shield, CreditCard } from "lucide-react";
import ExtraInfo from "@/components/forms/ExtraInfo";
import StatusBadge from "@/components/reusables/StatusBadge";
import BankVerificationModal from "./BankVerification";
import IDVerificationModal from "./IDVerificationModal";
import { useVerifications } from "./hooks/useVerifications";

const VerificationCard = ({
  icon,
  title,
  description,
  status,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: "verified" | "unverified";
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="group cursor-pointer p-5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 hover:border-primary-200 transition-all duration-200 hover:shadow-md"
  >
    <div className="flex items-center gap-4">
      <div
        className={`p-3 rounded-xl transition-colors ${
          status === "verified"
            ? "bg-success-light text-success"
            : "bg-neutral-200 text-text-muted group-hover:bg-primary-100 group-hover:text-primary"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-text-primary mb-1">{title}</h3>
        <p className="text-sm text-text-muted">{description}</p>
      </div>
      <StatusBadge status={status} showDot />
    </div>
  </div>
);

const Verifications: React.FC = () => {
  const {
    user,
    name,
    idVerification,
    paymentVerification,
    methods,
    FeedbackModal,
    bankList,
    isSubmitting,
    onSubmitBankVerification,
    handleIdVerificationSuccess,
    isIdentityVerified,
    isBankVerified,
  } = useVerifications();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
          Account Verification
        </h1>
        <p className="text-text-muted">
          Complete these verification steps to unlock all CitiTasker features
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-text-primary">
            Verification Progress
          </h2>
          <span className="text-sm text-text-muted">
            {(isIdentityVerified ? 1 : 0) + (isBankVerified ? 1 : 0)} of 2
            completed
          </span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                ((isIdentityVerified ? 1 : 0) + (isBankVerified ? 1 : 0)) * 50
              }%`,
            }}
          />
        </div>
      </div>

      {/* Verification Cards */}
      <div className="space-y-4">
        <VerificationCard
          icon={<Shield className="w-6 h-6" />}
          title="Identity Verification"
          description="Verify your identity with government-issued ID"
          status={isIdentityVerified ? "verified" : "unverified"}
          onClick={idVerification.openModal}
        />
        <VerificationCard
          icon={<CreditCard className="w-6 h-6" />}
          title="Payment Method"
          description="Add and verify your bank account for secure payments"
          status={isBankVerified ? "verified" : "unverified"}
          onClick={paymentVerification.openModal}
        />
      </div>

      {/* Information Section */}
      <ExtraInfo className="max-w-full">
        <div className="space-y-3">
          <p className="font-medium text-text-primary">
            Important Verification Tips:
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              • Use your legal name exactly as it appears on official documents
            </li>
            <li>
              • Ensure your date of birth matches your ID to avoid
              re-verification
            </li>
            <li>
              • All information is encrypted and used for security purposes only
            </li>
          </ul>
        </div>
      </ExtraInfo>

      {/* Privacy Notice */}
      <div className="text-center">
        <p className="text-sm text-text-muted">
          Your information is protected by our{" "}
          <button className="text-primary hover:underline font-medium">
            Privacy Policy
          </button>{" "}
          and used solely for verification purposes.
        </p>
      </div>

      {/* Modals */}
      <IDVerificationModal
        isOpen={idVerification.isOpen}
        onClose={idVerification.closeModal}
        user={user}
        handleSuccess={handleIdVerificationSuccess}
      />
      <BankVerificationModal
        isOpen={paymentVerification.isOpen}
        onClose={paymentVerification.closeModal}
        methods={methods}
        onSubmit={onSubmitBankVerification}
        bankList={bankList}
        name={name}
        isSubmitting={isSubmitting}
      />
      <FeedbackModal />
    </div>
  );
};

export default Verifications;
