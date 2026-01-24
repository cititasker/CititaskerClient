"use client";

import { memo, useCallback, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import CustomTab from "@/components/reusables/CustomTab";
import PosterForm from "./PosterForm";
import TaskerForm from "./TaskerForm";
import Success from "../reusables/Success";
import useModal from "@/hooks/useModal";
import { cn } from "@/lib/utils";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModalHeader = memo(() => (
  <DialogHeader className="space-y-4 text-center">
    <div className="flex items-center justify-center gap-3">
      <DialogTitle className="text-2xl font-bold sm:text-3xl">
        CitiTasker
      </DialogTitle>
      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
        Coming Soon
      </span>
    </div>
    <DialogDescription className="text-text-muted text-sm">
      Join our waitlist and be among the first to experience CitiTasker
    </DialogDescription>
  </DialogHeader>
));

ModalHeader.displayName = "ModalHeader";

const SuccessContent = memo(() => (
  <div className="py-4">
    <Success
      title="Thank You! 🎉"
      desc="You have successfully joined our waitlist. We'll be in touch with you soon!"
    />
  </div>
));

SuccessContent.displayName = "SuccessContent";

export default function WaitlistModal({
  open,
  onOpenChange,
}: WaitlistModalProps) {
  const showSuccess = useModal();

  const handleSuccess = useCallback(() => {
    showSuccess.openModal();

    try {
      localStorage.setItem("welcomeModalClosed", "true");
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }, [showSuccess, onOpenChange]);

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        showSuccess.closeModal();
      }
      onOpenChange(isOpen);
    },
    [onOpenChange, showSuccess],
  );

  const tabs = useMemo(
    () => [
      {
        label: "Join as a Poster",
        value: "poster",
        render: () => <PosterForm onSuccess={handleSuccess} />,
      },
      {
        label: "Join as a Tasker",
        value: "tasker",
        render: () => <TaskerForm onSuccess={handleSuccess} />,
      },
    ],
    [handleSuccess],
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "p-0 max-h-[90vh] overflow-hidden",
          showSuccess.isOpen ? "max-w-md" : "max-w-2xl",
        )}
      >
        {/* Accessibility elements */}
        {!showSuccess.isOpen && (
          <VisuallyHidden>
            <DialogTitle>Join CitiTasker Waitlist</DialogTitle>
            <DialogDescription>
              Choose to join as a Poster or Tasker
            </DialogDescription>
          </VisuallyHidden>
        )}

        <div className="p-6 sm:p-8 overflow-y-auto no-scrollbar max-h-[calc(90vh-2rem)]">
          {showSuccess.isOpen ? (
            <>
              <VisuallyHidden>
                <DialogTitle>Success</DialogTitle>
                <DialogDescription>
                  Successfully joined waitlist
                </DialogDescription>
              </VisuallyHidden>
              <SuccessContent />
            </>
          ) : (
            <div className="space-y-6">
              <ModalHeader />

              {/* Tabs */}
              <CustomTab
                items={tabs}
                defaultValue="poster"
                queryKey="waitlist_type"
                syncWithQuery={false}
                mobileAsCards={false}
                className="pb-0"
                listClassName="grid w-full grid-cols-2 gap-2 bg-neutral-100 p-1 rounded-lg max-w-[400px] mx-auto"
                triggerClassName="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm py-2.5 px-4 rounded-md transition-all"
                contentClassName="pt-6 pb-0"
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
