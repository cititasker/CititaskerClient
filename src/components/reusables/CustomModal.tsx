"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FC, ReactNode } from "react";
import SuccessConfetti from "./SuccessConfetti";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";

interface CustomModalProps extends IModal {
  className?: string; // container wrapper styling
  contentClassName?: string; // dialog content styling
  hideClose?: boolean;
  confetti?: boolean;
  disableAutoFocus?: boolean;
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
  ...rest
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {confetti && <SuccessConfetti />}
      <DialogContent
        aria-labelledby={undefined}
        aria-describedby={undefined}
        className={cn(
          "block fixed top-1/2 left-1/2 max-w-[576px] w-[90vw] max-h-[90vh] overflow-x-hidden overflow-y-auto no-scrollbar -translate-x-1/2 -translate-y-1/2 rounded-[20px] sm:rounded-[30px] bg-white p-5 sm:px-8 sm:py-6 focus:outline-none",
          contentClassName
        )}
        hideClose={hideClose}
        onOpenAutoFocus={(e) => {
          if (disableAutoFocus) e.preventDefault();
        }}
        {...rest}
      >
        <DialogHeader>
          <VisuallyHidden asChild>
            <DialogTitle />
          </VisuallyHidden>
          <VisuallyHidden asChild>
            <DialogDescription />
          </VisuallyHidden>
        </DialogHeader>
        <div className={cn("overflow-x-hidden w-full h-full", className)}>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
