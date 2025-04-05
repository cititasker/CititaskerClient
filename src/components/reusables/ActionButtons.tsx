import React from "react";
import FormButton from "../forms/FormButton";
import { cn } from "@/utils";

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
}: IProps) => {
  return (
    <div
      className={cn(
        "flex gap-x-4 sm:gap-x-8 items-center mt-auto pb-5",
        className
      )}
    >
      <FormButton
        text={cancelText}
        btnStyle={cn(
          "flex-1 bg-light-grey text-primary font-normal",
          cancelStyle
        )}
        handleClick={handleCancel}
      />
      <FormButton
        text={okText}
        type={type}
        btnStyle={cn("flex-1 font-medium", okStyle)}
        loading={loading}
        handleClick={handleSubmit}
      />
    </div>
  );
};

export default ActionsButtons;
