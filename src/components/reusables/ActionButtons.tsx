import React from "react";
import FormButton from "../forms/FormButton";
import { cn } from "@/utils";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "../ui/button";

interface IProps {
  loading?: boolean;
  cancelText?: string;
  okText?: string;
  okStyle?: string;
  cancelStyle?: string;
  className?: string;
  handleCancel?: any;
  showCancelButton?: boolean;
  handleSubmit?: any;
  type?: "submit" | "button";
  disabled?: boolean;
  okVariant?: VariantProps<typeof buttonVariants>["variant"];
  cancelVariant?: VariantProps<typeof buttonVariants>["variant"];
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
}
const ActionsButtons = ({
  loading,
  className,
  handleCancel,
  showCancelButton = true,
  handleSubmit,
  okStyle,
  cancelStyle,
  type = "submit",
  okText = "Submit",
  cancelText = "Cancel",
  disabled = false,
  okVariant = "default",
  cancelVariant = "outline",
  size = "default",
}: IProps) => {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row gap-y-3 gap-x-3 sm:gap-x-6 items-center mt-auto w-full",
        className
      )}
    >
      {handleCancel && showCancelButton && (
        <FormButton
          variant={cancelVariant}
          text={cancelText}
          size={size}
          className={cn("w-full", cancelStyle)}
          onClick={handleCancel}
        />
      )}
      <FormButton
        text={okText}
        type={type}
        className={cn("w-full", okStyle)}
        loading={loading}
        onClick={handleSubmit}
        disabled={disabled || loading}
        variant={okVariant}
        size={size}
      />
    </div>
  );
};

export default ActionsButtons;
