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
  handleSubmit?: any;
  type?: "submit" | "button";
  disabled?: boolean;
  okVariant?: VariantProps<typeof buttonVariants>["variant"];
}
const ActionsButtons = ({
  loading,
  className,
  handleCancel,
  handleSubmit,
  okStyle,
  cancelStyle,
  type = "submit",
  okText = "Submit",
  cancelText = "Cancel",
  disabled = false,
  okVariant = "default",
}: IProps) => {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row gap-y-3 gap-x-4 sm:gap-x-8 items-center mt-auto w-full",
        className
      )}
    >
      {handleCancel && (
        <FormButton
          variant="ghost"
          text={cancelText}
          className={cn(
            "flex-1 bg-light-grey !text-primary w-full border-[1.5px] border-primary",
            cancelStyle
          )}
          onClick={handleCancel}
        />
      )}
      <FormButton
        text={okText}
        type={type}
        className={cn("flex-1 w-full", okStyle)}
        loading={loading}
        onClick={handleSubmit}
        disabled={disabled || loading}
        variant={okVariant}
      />
    </div>
  );
};

export default ActionsButtons;
