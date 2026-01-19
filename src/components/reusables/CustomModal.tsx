"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/utils";
import FormButton from "@/components/forms/FormButton";
import SuccessConfetti from "./SuccessConfetti";

interface ModalAction {
  text: string;
  onClick: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface CustomModalProps extends IModal {
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  hideClose?: boolean;
  confetti?: boolean;
  disableAutoFocus?: boolean;

  // Footer actions
  primaryAction?: ModalAction;
  secondaryAction?: ModalAction;
  showCancel?: boolean;
  cancelText?: string;
  customFooter?: React.ReactNode;

  // Styling
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  [key: string]: any;
}

const CustomModal = ({
  isOpen,
  onClose,
  children,
  title,
  description,
  size = "md",
  hideClose = false,
  confetti = false,
  disableAutoFocus = true,

  // Footer props
  primaryAction,
  secondaryAction,
  showCancel = false,
  cancelText = "Cancel",
  customFooter,

  // Styling props
  titleClassName,
  descriptionClassName,
  bodyClassName,
  headerClassName,
  contentClassName,
  footerClassName,
  ...rest
}: CustomModalProps) => {
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[95vw] max-h-[95vh]",
  };

  const hasHeader = title || description;
  const hasFooter =
    primaryAction || secondaryAction || showCancel || customFooter;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {confetti && <SuccessConfetti />}

      <DialogContent
        className={cn(
          "w-[95vw] bg-background border border-border-light shadow-2xl z-50",
          "focus:outline-none",
          sizeClasses[size],
          "rounded-xl sm:rounded-2xl",
          "max-h-[90vh] sm:max-h-[85vh] min-h-0",
          "flex flex-col p-0",
          contentClassName
        )}
        hideClose={hideClose}
        onOpenAutoFocus={(e) => disableAutoFocus && e.preventDefault()}
        {...rest}
      >
        {/* Sticky Header */}
        {hasHeader && (
          <DialogHeader
            className={cn(
              "border-b border-light-grey",
              "px-4 sm:px-6 py-4",
              "shrink-0",
              headerClassName
            )}
          >
            <DialogTitle
              className={cn(
                "text-lg sm:text-xl font-semibold pr-8",
                titleClassName
              )}
            >
              {title}
            </DialogTitle>

            {description && (
              <DialogDescription
                className={cn("text-text-secondary", descriptionClassName)}
              >
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}

        {/* SCROLLABLE BODY */}
        <div
          className={cn(
            "flex-1 min-h-0",
            hasFooter ? "overflow-y-auto no-scrollbar" : "overflow-hidden",
            "p-5",
            bodyClassName
          )}
        >
          {children}
        </div>

        {/* Sticky Footer */}
        {hasFooter && (
          <div
            className={cn(
              "border-t border-light-grey",
              "px-4 sm:px-6 py-4",
              "shrink-0",
              footerClassName
            )}
          >
            {customFooter || (
              <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
                {showCancel && (
                  <FormButton
                    variant="outline"
                    onClick={onClose}
                    disabled={
                      primaryAction?.loading || secondaryAction?.loading
                    }
                    className="w-full sm:w-auto min-w-[100px]"
                  >
                    {cancelText}
                  </FormButton>
                )}

                {secondaryAction && (
                  <FormButton
                    variant={secondaryAction.variant || "outline"}
                    onClick={secondaryAction.onClick}
                    loading={secondaryAction.loading}
                    disabled={secondaryAction.disabled}
                    className="w-full sm:w-auto min-w-[100px]"
                  >
                    {secondaryAction.icon && (
                      <span className="mr-2">{secondaryAction.icon}</span>
                    )}
                    {secondaryAction.text}
                  </FormButton>
                )}

                {primaryAction && (
                  <FormButton
                    variant={primaryAction.variant || "default"}
                    onClick={primaryAction.onClick}
                    loading={primaryAction.loading}
                    disabled={primaryAction.disabled}
                    className="w-full sm:w-auto min-w-[100px]"
                  >
                    {primaryAction.icon && (
                      <span className="mr-2">{primaryAction.icon}</span>
                    )}
                    {primaryAction.text}
                  </FormButton>
                )}
              </div>
            )}
          </div>
        )}
        {/* Hidden accessibility elements */}
        {!hasHeader && (
          <>
            <VisuallyHidden asChild>
              <DialogTitle>Modal</DialogTitle>
            </VisuallyHidden>
            <VisuallyHidden asChild>
              <DialogDescription>Modal content</DialogDescription>
            </VisuallyHidden>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
