"use client";

import React from "react";
import { Shield, Lock } from "lucide-react";

import CustomModal from "@/components/reusables/CustomModal";
import { cn } from "@/lib/utils";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: React.ReactNode;
  showPadlock?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  showPadlock = true,
  icon,
  className,
}) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName={cn("max-w-md mx-auto", className)}
    >
      <div>
        {/* Background Security Icon */}
        {showPadlock && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <Lock className="w-32 h-32 text-primary" />
          </div>
        )}

        {/* Header */}
        <div className="relative z-10 space-y-6">
          <div className="text-center space-y-3">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center border-2 border-primary-200">
                {icon || <Shield className="w-8 h-8 text-primary" />}
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
                {title}
              </h2>
              <p className="text-sm sm:text-base text-text-muted max-w-sm mx-auto leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">{children}</div>
        </div>
      </div>
    </CustomModal>
  );
};

export default BaseModal;
