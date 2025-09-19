"use client";

import React, { useEffect } from "react";
import CustomModal from "@/components/reusables/CustomModal";
import { cn } from "@/lib/utils";
import FormButton from "@/components/forms/FormButton";
import {
  FEEDBACK_CONFIG,
  FeedbackAction,
  SIZE_CONFIG,
  UniversalFeedbackModalProps,
} from "./constants";

const UniversalFeedbackModal: React.FC<UniversalFeedbackModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  size = "md",
  actions,
  autoClose,
  showCloseButton = true,
  icon: customIcon,
  className,
}) => {
  const config = FEEDBACK_CONFIG[type];
  const sizeConfig = SIZE_CONFIG[size];
  const IconComponent = config.icon;

  // Auto close functionality
  useEffect(() => {
    if (isOpen && autoClose && autoClose > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoClose);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, onClose]);

  // Default actions if none provided
  const defaultActions: FeedbackAction[] = [
    {
      label: "OK",
      onClick: onClose,
      variant: type === "success" ? "default" : "secondary",
    },
  ];

  const modalActions = actions || defaultActions;
  const displayTitle = title || config.defaultTitle;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName={cn(sizeConfig.modal, "mx-auto", className)}
      hideClose={showCloseButton}
    >
      <div
        className={cn(
          sizeConfig.content,
          sizeConfig.spacing,
          "text-center relative"
        )}
      >
        {/* Icon */}
        <div className="flex justify-center">
          <div
            className={cn(
              sizeConfig.icon,
              config.iconBg,
              config.borderColor,
              "rounded-full flex items-center justify-center border-2"
            )}
          >
            {customIcon || (
              <IconComponent
                className={cn(sizeConfig.iconSize, config.iconColor)}
              />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h2
            className={cn(sizeConfig.title, "font-semibold text-text-primary")}
          >
            {displayTitle}
          </h2>

          <p className="text-text-secondary leading-relaxed max-w-sm mx-auto">
            {message}
          </p>
        </div>

        {/* Actions */}
        {modalActions.length > 0 && (
          <div
            className={cn(
              "flex gap-3 pt-2",
              modalActions.length === 1
                ? "justify-center"
                : "justify-center flex-wrap"
            )}
          >
            {modalActions.map((action, index) => (
              <FormButton
                key={index}
                onClick={action.onClick}
                variant={action.variant || "secondary"}
                loading={action.loading}
                className={cn(
                  "min-w-[100px]",
                  action.variant === "default" && "btn-primary"
                )}
              >
                {action.label}
              </FormButton>
            ))}
          </div>
        )}

        {/* Auto close indicator */}
        {autoClose && autoClose > 0 && (
          <p className="text-xs text-text-muted mt-4">
            This will close automatically in {Math.ceil(autoClose / 1000)}{" "}
            seconds
          </p>
        )}
      </div>
    </CustomModal>
  );
};

export default UniversalFeedbackModal;
