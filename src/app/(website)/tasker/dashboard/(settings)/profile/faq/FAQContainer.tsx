"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownUp, Plus, Save, X } from "lucide-react";
import { useAppSelector } from "@/store/hook";
import useToggle from "@/hooks/useToggle";
import FAQList from "./FAQList";
import { FAQMode } from "./constants";
import { FAQHeader } from "./_components/FAQHeader";
import { useReorderFaqs } from "./hooks/useReorderFaqs";
import FAQForm from "./FAQForm";

// Action buttons component
const FAQActionButtons = ({
  mode,
  isRearranging,
  isSaving,
  onAddFAQ,
  onAddMultipleFAQs,
  onStartRearrange,
  onCancelRearrange,
  onSaveRearrange,
}: {
  mode: FAQMode;
  isRearranging: boolean;
  isSaving: boolean;
  onAddFAQ: () => void;
  onAddMultipleFAQs: () => void;
  onStartRearrange: () => void;
  onCancelRearrange: () => void;
  onSaveRearrange: () => void;
}) => {
  if (mode !== "list") return null;

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center sm:justify-end mb-6">
      {isRearranging ? (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancelRearrange}
            disabled={isSaving}
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={onSaveRearrange}
            disabled={isSaving}
            size="sm"
            className="btn-primary"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Order
          </Button>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onStartRearrange}
            className="hover:bg-neutral-50 order-2 sm:order-1"
          >
            <ArrowDownUp className="w-4 h-4 mr-2" />
            Reorder
          </Button>
          <Button
            onClick={onAddMultipleFAQs}
            variant="outline"
            size="sm"
            className="hover:bg-primary-50 hover:border-primary hover:text-primary order-3 sm:order-2"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Multiple
          </Button>
          <Button
            onClick={onAddFAQ}
            size="sm"
            className="btn-primary order-1 sm:order-3"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add FAQ
          </Button>
        </div>
      )}
    </div>
  );
};

// Main FAQ container
export default function FAQContainer() {
  const rearrange = useToggle();
  const [mode, setMode] = useState<FAQMode>("list");
  const { user } = useAppSelector((state) => state.user);

  const userId = String(user.id);

  const {
    reorderedFaqs,
    setReorderedFaqs,
    handleSaveReorder,
    resetReorderedFaqs,
    isSaving,
  } = useReorderFaqs(userId);

  const handleCancelRearrange = () => {
    rearrange.handleClose();
    setReorderedFaqs([]);
  };

  const handleFormSuccess = () => {
    setMode("list");
  };

  const handleFormCancel = () => {
    setMode("list");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <FAQHeader mode={mode} isRearranging={rearrange.isOpen} />
        <FAQActionButtons
          mode={mode}
          isRearranging={rearrange.isOpen}
          isSaving={isSaving}
          onAddFAQ={() => setMode("create")}
          onAddMultipleFAQs={() => setMode("create-multiple")}
          onStartRearrange={rearrange.handleOpen}
          onCancelRearrange={handleCancelRearrange}
          onSaveRearrange={handleSaveReorder}
        />
      </div>

      {/* Content based on mode */}
      {mode === "create" && (
        <FAQForm
          mode="create"
          onCancel={handleFormCancel}
          onSuccess={handleFormSuccess}
        />
      )}

      {mode === "create-multiple" && (
        <FAQForm
          mode="create-multiple"
          onCancel={handleFormCancel}
          onSuccess={handleFormSuccess}
        />
      )}

      {mode === "list" && (
        <FAQList
          id={user?.id ?? ""}
          rearrange={rearrange.isOpen}
          onFaqsReorderChange={setReorderedFaqs}
        />
      )}
    </div>
  );
}
