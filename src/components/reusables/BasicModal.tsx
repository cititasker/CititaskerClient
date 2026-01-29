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
import SuccessConfetti from "./SuccessConfetti";

interface CustomModalProps extends IModal {
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl";
  hideClose?: boolean;
  confetti?: boolean;
  className?: string;
  contentClassName?: string;
}

const BasicModal = ({
  isOpen,
  onClose,
  children,
  title,
  description,
  size = "md",
  hideClose = false,
  confetti = false,
  className,
  contentClassName,
}: CustomModalProps) => {
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  const hasHeader = title || description;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {confetti && <SuccessConfetti />}

      <DialogContent
        className={cn(
          "bg-white border border-neutral-200 shadow-2xl",
          "max-h-[90vh]",
          sizeClasses[size],
          className,
        )}
        hideClose={hideClose}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {hasHeader && (
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-neutral-200 flex-shrink-0">
            <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
            {description && (
              <DialogDescription className="text-neutral-600 mt-2">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}

        <div className={cn("flex-1", contentClassName)}>{children}</div>

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

export default BasicModal;
