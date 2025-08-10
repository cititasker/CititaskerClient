"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FC } from "react";
import SuccessConfetti from "./SuccessConfetti";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";

interface CustomModalProps extends IModal {
  className?: string; // container wrapper styling
  contentClassName?: string; // dialog content styling
  hideClose?: boolean;
  confetti?: boolean;
  disableAutoFocus?: boolean;
  title?: string;
  description?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  [key: string]: any;
}

const CustomModal: FC<CustomModalProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
  contentClassName = "",
  hideClose = false,
  confetti = false,
  disableAutoFocus = true,
  title,
  description,
  titleClassName,
  descriptionClassName,
  ...rest
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {confetti && <SuccessConfetti />}
      <DialogContent
        aria-labelledby={undefined}
        aria-describedby={undefined}
        className={cn(
          "max-w-lg w-[90vw] bg-white p-5 sm:px-8 sm:py-6 focus:outline-none",
          contentClassName
        )}
        hideClose={hideClose}
        onOpenAutoFocus={(e) => {
          if (disableAutoFocus) e.preventDefault();
        }}
        {...rest}
      >
        <DialogHeader>
          {title || description ? (
            <div className="mb-4">
              {title && (
                <DialogTitle
                  className={cn(
                    "font-semibold text-2xl text-black-2",
                    titleClassName
                  )}
                >
                  {title}
                </DialogTitle>
              )}
              {description && (
                <DialogDescription
                  className={cn("mt-1.5", descriptionClassName)}
                >
                  {description}
                </DialogDescription>
              )}
            </div>
          ) : null}
          <VisuallyHidden asChild>
            <DialogTitle />
          </VisuallyHidden>
          <VisuallyHidden asChild>
            <DialogDescription />
          </VisuallyHidden>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
