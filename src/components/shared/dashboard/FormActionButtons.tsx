"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, X, Loader2 } from "lucide-react";
import clsx from "clsx";

interface FormActionButtonsProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  onCancel?: () => void;
  onSubmit?: () => void;

  cancelText?: string;
  submitText?: string;

  cancelIcon?: React.ReactNode;
  submitIcon?: React.ReactNode;

  showCancel?: boolean;
  showSubmit?: boolean;

  cancelButtonProps?: React.ComponentProps<typeof Button>;
  submitButtonProps?: React.ComponentProps<typeof Button>;

  formId?: string;
  cancelType?: "submit" | "button";
  submitType?: "submit" | "button";

  cancelVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "nude"
    | "custom"
    | null
    | undefined;
}

export const FormActionButtons: React.FC<FormActionButtonsProps> = ({
  isLoading = false,
  isDisabled = false,
  onCancel,
  onSubmit,

  cancelText = "Cancel",
  submitText = "Save Changes",

  cancelIcon = <X className="w-4 h-4" />,
  submitIcon = <Save className="w-4 h-4" />,

  showCancel = true,
  showSubmit = true,

  cancelButtonProps = {},
  submitButtonProps = {},

  formId,
  submitType = "submit",
  cancelType = "button",

  cancelVariant = "outline",
}) => {
  return (
    <div className="flex gap-3">
      {showCancel && (
        <Button
          type={cancelType}
          onClick={onCancel}
          variant={cancelVariant}
          size="sm"
          className={clsx(
            "flex items-center gap-2",
            cancelButtonProps.className
          )}
          disabled={isDisabled || isLoading}
          {...cancelButtonProps}
        >
          {cancelIcon}
          {cancelText}
        </Button>
      )}

      {showSubmit && (
        <Button
          type={submitType}
          form={formId}
          onClick={onSubmit}
          size="sm"
          disabled={isDisabled || isLoading}
          className={clsx(
            "flex items-center gap-2 min-w-[100px]",
            submitButtonProps.className
          )}
          {...submitButtonProps}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              {submitIcon}
              {submitText}
            </>
          )}
        </Button>
      )}
    </div>
  );
};
