import React from "react";
import { AlertTriangle, Trash2, CheckCircle, Info } from "lucide-react";
import CustomModal from "../CustomModal";
import FormButton from "@/components/forms/FormButton";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";

interface ConfirmModalProps {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  cancelVariant?: VariantProps<typeof buttonVariants>["variant"];
  loading?: boolean;
  type?: "warning" | "danger" | "success" | "info";
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

// Icon mapping for different types
const typeConfig = {
  warning: {
    icon: AlertTriangle,
    iconClass: "text-warning bg-warning-light",
    confirmVariant: "default" as const,
  },
  danger: {
    icon: Trash2,
    iconClass: "text-error bg-error-light",
    confirmVariant: "destructive" as const,
  },
  success: {
    icon: CheckCircle,
    iconClass: "text-success bg-success-light",
    confirmVariant: "default" as const,
  },
  info: {
    icon: Info,
    iconClass: "text-info bg-info-light",
    confirmVariant: "default" as const,
  },
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onConfirm,
  onClose,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant,
  cancelVariant = "outline",
  loading = false,
  type = "warning",
  icon,
  children,
}) => {
  const config = typeConfig[type];
  const IconComponent = config.icon;
  const defaultVariant = variant || config.confirmVariant;

  return (
    <CustomModal
      isOpen={open}
      onClose={onClose}
      size="sm"
      stickyHeader={false}
      contentClassName="max-w-sm sm:max-w-md"
    >
      <div className="text-center space-y-6">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center">
          {icon || (
            <div
              className={cn(
                "w-full h-full rounded-full flex items-center justify-center",
                config.iconClass
              )}
            >
              <IconComponent className="w-8 h-8" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-lg sm:text-xl font-semibold text-text-primary">
            {title}
          </h3>

          {description && (
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Custom content */}
        {children && <div className="text-left">{children}</div>}

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-3 sm:justify-center pt-2">
          <FormButton
            variant={cancelVariant}
            onClick={onClose}
            disabled={loading}
            className="w-full sm:w-auto min-w-[120px] flex-1"
          >
            {cancelText}
          </FormButton>

          <FormButton
            variant={defaultVariant}
            onClick={onConfirm}
            loading={loading}
            disabled={loading}
            className="w-full sm:w-auto min-w-[120px] flex-1"
          >
            {confirmText}
          </FormButton>
        </div>
      </div>
    </CustomModal>
  );
};

// Preset variations for common use cases
export const DeleteConfirmModal = (
  props: Omit<ConfirmModalProps, "type" | "confirmText"> & {
    itemName?: string;
    title?: string;
  }
) => {
  const {
    itemName,
    title = `Delete ${itemName || "item"}?`, // use title if provided, otherwise default
    ...rest
  } = props;

  return (
    <ConfirmModal type="danger" title={title} confirmText="Delete" {...rest} />
  );
};

export const SaveConfirmModal = (
  props: Omit<ConfirmModalProps, "type" | "confirmText">
) => <ConfirmModal type="info" confirmText="Save" {...props} />;

export const WarningConfirmModal = (props: Omit<ConfirmModalProps, "type">) => (
  <ConfirmModal type="warning" {...props} />
);
