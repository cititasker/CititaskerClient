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
  stickyHeader?: boolean;
  stickyFooter?: boolean;
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
  contentClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
}

const CustomModal = ({
  isOpen,
  onClose,
  children,
  title,
  description,
  size = "md",
  stickyHeader = true,
  stickyFooter = true,
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
  contentClassName,
  headerClassName,
  bodyClassName,
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
          // Base styles
          "w-[95vw] bg-background border border-border-light shadow-2xl",
          "focus:outline-none overflow-hidden flex flex-col",

          // Size
          sizeClasses[size],

          // Mobile optimizations
          "rounded-xl sm:rounded-2xl",
          "max-h-[90vh] sm:max-h-[85vh]",

          // Conditional padding
          (stickyHeader && hasHeader) || (stickyFooter && hasFooter)
            ? "p-0"
            : "p-4 sm:p-6",

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
              "flex-shrink-0 border-b border-light-grey backdrop-blur-3xl",
              stickyHeader && "sticky top-0 z-20",
              "px-4 sm:px-6 py-4 sm:py-5",
              headerClassName
            )}
          >
            <div className="space-y-2">
              {title && (
                <DialogTitle className="text-lg sm:text-xl font-semibold text-text-primary leading-tight pr-8">
                  {title}
                </DialogTitle>
              )}

              {description && (
                <DialogDescription className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  {description}
                </DialogDescription>
              )}
            </div>
          </DialogHeader>
        )}

        {/* Content Body */}
        <div
          className={cn(
            "flex-1 overflow-y-auto",
            hasHeader ? "px-4 sm:px-6 py-4 sm:py-6" : "",
            hasFooter && !hasHeader ? "p-4 sm:p-6" : "",
            hasFooter ? "pb-0" : "",
            "scrollbar-thin scrollbar-thumb-border-medium scrollbar-track-transparent no-scrollbar",
            bodyClassName
          )}
        >
          {children}
        </div>

        {/* Sticky Footer */}
        {hasFooter && (
          <div
            className={cn(
              "flex-shrink-0 border-t border-light-grey backdrop-blur-sm",
              stickyFooter && "sticky bottom-0 z-20",
              "px-4 sm:px-6 py-4",
              footerClassName
            )}
          >
            {customFooter || (
              <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
                {/* Cancel Button */}
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

                {/* Secondary Action */}
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

                {/* Primary Action */}
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

// Usage Examples
export const ModalExamples = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Basic modal with actions */}
      <CustomModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Confirm Action"
        description="Are you sure you want to proceed?"
        primaryAction={{
          text: "Confirm",
          onClick: () => setOpen(false),
          variant: "default",
        }}
        secondaryAction={{
          text: "Save Draft",
          onClick: () => setOpen(false),
          variant: "outline",
        }}
      >
        <p>Modal content goes here...</p>
      </CustomModal>

      {/* Modal without cancel button */}
      <CustomModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Processing"
        showCancel={false}
        primaryAction={{
          text: "Processing...",
          onClick: () => {},
          loading: true,
          disabled: true,
        }}
      >
        <p>Please wait while we process your request...</p>
      </CustomModal>

      {/* Modal with custom footer */}
      <CustomModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Custom Footer"
        customFooter={
          <div className="flex justify-between w-full">
            <button className="text-text-muted text-sm">Need help?</button>
            <div className="flex gap-2">
              <FormButton variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </FormButton>
              <FormButton onClick={() => setOpen(false)}>Save</FormButton>
            </div>
          </div>
        }
      >
        <p>Modal with completely custom footer...</p>
      </CustomModal>
    </>
  );
};
