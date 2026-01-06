"use client";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomTab from "@/components/reusables/CustomTab";
import PosterForm from "./PosterForm";
import TaskerForm from "./TaskerForm";
import Icons from "../Icons";
import FormButton from "../forms/FormButton";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function WaitlistModal({
  open,
  onOpenChange,
}: WaitlistModalProps) {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = () => {
    setShowSuccess(true);
    onOpenChange(false);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const tabs = [
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
  ];

  return (
    <>
      {/* Main Waitlist Form Modal */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl p-0">
          <div className="p-6 sm:p-8">
            {/* Header */}
            <DialogHeader className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <DialogTitle className="text-2xl font-bold sm:text-3xl">
                  CitiTasker
                </DialogTitle>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <Sparkles size={12} />
                  Coming Soon
                </span>
              </div>
            </DialogHeader>

            {/* Tabs */}
            <div className="mt-8">
              <CustomTab
                items={tabs}
                defaultValue="poster"
                queryKey="waitlist_type"
                className="pb-0"
                listClassName="grid w-full grid-cols-2 gap-2 bg-neutral-100 p-1 justify-center max-w-[400px] mx-auto"
                triggerClassName=" data-[state=active]:bg-primary data-[state=active]:text-white py-2 max-w-full"
                contentClassName="rounded-none sm:py-0"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-md">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Icons.checkCircleSuccess className="mb-6" />

            <h3 className="mb-3 text-2xl font-bold">Thank You! 🎉</h3>

            <p className="mb-6 text-neutral-600">
              You have successfully joined our waitlist. We'll be in touch with
              you soon!
            </p>

            <FormButton
              onClick={handleCloseSuccess}
              className="w-full max-w-[200px]"
            >
              Close
            </FormButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
