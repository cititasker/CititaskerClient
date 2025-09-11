"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { SheetFooter as ShadcnSheetFooter } from "@/components/ui/sheet";
import { RotateCcw, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SheetFooterAction {
  label: string;
  onClick: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

interface ReusableSheetFooterProps {
  // Primary actions
  primaryAction?: SheetFooterAction;
  secondaryAction?: SheetFooterAction;

  // Common presets
  showReset?: boolean;
  showCancel?: boolean;
  showApply?: boolean;
  showSave?: boolean;

  // Custom actions
  actions?: SheetFooterAction[];

  // Callbacks for presets
  onReset?: () => void;
  onCancel?: () => void;
  onApply?: () => void;
  onSave?: () => void;

  // Loading states
  isLoading?: boolean;

  // Layout
  layout?: "row" | "column";
  className?: string;

  // Disable all actions
  disabled?: boolean;
}

export const ReusableSheetFooter = ({
  primaryAction,
  secondaryAction,
  showReset = false,
  showCancel = false,
  showApply = true,
  showSave = false,
  actions = [],
  onReset,
  onCancel,
  onApply,
  onSave,
  isLoading = false,
  layout = "row",
  className,
  disabled = false,
}: ReusableSheetFooterProps) => {
  // Build preset actions
  const presetActions: SheetFooterAction[] = [];

  if (showReset && onReset) {
    presetActions.push({
      label: "Reset",
      onClick: onReset,
      variant: "outline",
      icon: <RotateCcw className="w-4 h-4 mr-2" />,
      disabled: disabled || isLoading,
    });
  }

  if (showCancel && onCancel) {
    presetActions.push({
      label: "Cancel",
      onClick: onCancel,
      variant: "outline",
      icon: <X className="w-4 h-4 mr-2" />,
      disabled: disabled,
    });
  }

  if (showSave && onSave) {
    presetActions.push({
      label: isLoading ? "Saving..." : "Save",
      onClick: onSave,
      variant: "default",
      icon: <Check className="w-4 h-4 mr-2" />,
      disabled: disabled || isLoading,
      loading: isLoading,
      type: "submit",
    });
  }

  if (showApply && onApply) {
    presetActions.push({
      label: isLoading ? "Applying..." : "Apply",
      onClick: onApply,
      variant: "default",
      disabled: disabled || isLoading,
      loading: isLoading,
      type: "submit",
    });
  }

  // Combine all actions
  const allActions = [
    ...presetActions,
    ...actions,
    ...(secondaryAction ? [secondaryAction] : []),
    ...(primaryAction ? [primaryAction] : []),
  ];

  if (allActions.length === 0) return null;

  const renderAction = (action: SheetFooterAction, index: number) => (
    <Button
      key={`action-${index}`}
      type={action.type || "button"}
      variant={action.variant || "default"}
      onClick={action.onClick}
      disabled={action.disabled || disabled || isLoading}
      className={cn(
        layout === "column" ? "w-full" : "flex-1",
        action.loading && "cursor-not-allowed"
      )}
    >
      {action.loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
          {action.label}
        </>
      ) : (
        <>
          {action.icon}
          {action.label}
        </>
      )}
    </Button>
  );

  return (
    <ShadcnSheetFooter
      className={cn(
        layout === "column" ? "flex-col gap-2" : "flex-row gap-2",
        "sm:flex-row sm:gap-2", // Always row on sm+ screens
        className
      )}
    >
      {allActions.map(renderAction)}
    </ShadcnSheetFooter>
  );
};

// Preset configurations for common use cases
export const FilterSheetFooter = (
  props: Pick<
    ReusableSheetFooterProps,
    "onReset" | "onApply" | "isLoading" | "disabled"
  >
) => <ReusableSheetFooter showReset showApply {...props} />;

export const FormSheetFooter = (
  props: Pick<
    ReusableSheetFooterProps,
    "onCancel" | "onSave" | "isLoading" | "disabled"
  >
) => <ReusableSheetFooter showCancel showSave {...props} />;

export const ConfirmSheetFooter = (
  props: Pick<
    ReusableSheetFooterProps,
    "onCancel" | "primaryAction" | "isLoading" | "disabled"
  >
) => (
  <ReusableSheetFooter
    showCancel
    primaryAction={props.primaryAction}
    isLoading={props.isLoading}
    disabled={props.disabled}
    onCancel={props.onCancel}
  />
);

export default ReusableSheetFooter;
