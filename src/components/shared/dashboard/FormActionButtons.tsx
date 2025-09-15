"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, X, Loader2 } from "lucide-react";
import clsx from "clsx";
import FormButton from "@/components/forms/FormButton";

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
  submitText = "Save",

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
        <FormButton
          type={cancelType}
          onClick={onCancel}
          variant={cancelVariant}
          size="sm"
          className={clsx("sm:min-w-[100px]", cancelButtonProps.className)}
          disabled={isDisabled || isLoading}
          {...cancelButtonProps}
        >
          <span className="sm:inline-block inline">{cancelIcon}</span>
          <span className="hidden sm:inline">{cancelText}</span>
        </FormButton>
      )}

      {showSubmit && (
        <FormButton
          type={submitType}
          form={formId}
          onClick={onSubmit}
          size="sm"
          disabled={isDisabled || isLoading}
          className={clsx("sm:min-w-[100px]", submitButtonProps.className)}
          loading={isLoading}
          {...submitButtonProps}
        >
          <>
            <span className="sm:inline-block inline">{submitIcon}</span>
            <span className="">{submitText}</span>
          </>
        </FormButton>
      )}
    </div>
  );
};
