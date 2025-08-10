import * as React from "react";
import { DialogHeader, DialogDescription } from "@/components/ui/dialog";
import CustomModal from "../CustomModal";
import FormButton from "@/components/forms/FormButton";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";

interface ConfirmModalProps {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  cancelVariant?: VariantProps<typeof buttonVariants>["variant"];
  loading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onConfirm,
  onClose,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  cancelVariant = "nude",
  loading = false,
  icon,
  children,
}) => {
  return (
    <CustomModal
      isOpen={open}
      onClose={onClose}
      contentClassName="w-full max-w-md rounded-md p-6"
      title={title}
    >
      <div>
        <DialogHeader className="space-y-3">
          {icon && <div className="mx-auto text-destructive">{icon}</div>}
          {description && (
            <DialogDescription className="text-base text-muted-foreground">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {children ?? (
          <div className="mt-6 flex justify-end gap-3 pt-2">
            <FormButton
              type="button"
              variant={cancelVariant}
              onClick={onClose}
              size="lg"
              disabled={loading}
            >
              {cancelText}
            </FormButton>
            <FormButton
              type="button"
              variant={variant}
              size="lg"
              onClick={onConfirm}
              disabled={loading}
              loading={loading}
            >
              {confirmText}
            </FormButton>
          </div>
        )}
      </div>
    </CustomModal>
  );
};
