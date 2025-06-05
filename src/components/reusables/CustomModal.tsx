"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { FC, ReactNode } from "react";
import SuccessConfetti from "./SuccessConfetti";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string; // container wrapper styling
  contentClassName?: string; // dialog content styling
  showCloseBtn?: boolean;
  confetti?: boolean;
  [key: string]: any;
}

const CustomModal: FC<CustomModalProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
  contentClassName = "",
  showCloseBtn = false,
  confetti = false,
  ...rest
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay className="fixed inset-0 bg-black/50" />
      <DialogContent
        aria-labelledby={undefined}
        aria-describedby={undefined}
        className={cn(
          "block fixed top-1/2 left-1/2 max-w-3xl w-[90vw] max-h-[90vh] overflow-auto-translate-x-1/2 -translate-y-1/2 !rounded-40 bg-white p-10 focus:outline-none",
          contentClassName
        )}
        {...rest}
      >
        {confetti && <SuccessConfetti />}
        <DialogHeader>
          <VisuallyHidden asChild>
            <DialogTitle />
          </VisuallyHidden>
          <VisuallyHidden asChild>
            <DialogDescription />
          </VisuallyHidden>
        </DialogHeader>
        <div className={className}>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
