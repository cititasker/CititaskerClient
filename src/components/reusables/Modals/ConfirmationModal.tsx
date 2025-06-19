import React from "react";
import CustomModal from "../CustomModal";
import ActionsButtons from "../ActionButtons";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";

interface IProps {
  loading?: boolean;
  open: boolean;
  onClose: any;
  title?: string;
  content?: string;
  children?: React.ReactNode;
  okStyle?: string;
  cancelStyle?: string;
  okText?: string;
  cancelText?: string;
  handleSubmit?: any;
  type?: "button" | "submit";
  showBtnActions?: boolean;
  okVariant?: VariantProps<typeof buttonVariants>["variant"];
}
const ConfirmationModal = ({
  loading,
  open,
  onClose,
  title,
  content,
  children,
  okStyle,
  cancelStyle,
  okText = "Submit",
  cancelText = "Cancel",
  handleSubmit,
  type = "button",
  showBtnActions = true,
  okVariant = "default",
}: IProps) => {
  return (
    <CustomModal isOpen={open} onClose={onClose}>
      <>
        {title && <p className="text-black-2 font-[600] text-2xl">{title}</p>}
        {content ? (
          <p className="my-[80px] text-center text-base">{content}</p>
        ) : (
          children
        )}
        {showBtnActions && (
          <ActionsButtons
            okStyle={okStyle}
            cancelStyle={cancelStyle}
            okText={okText}
            cancelText={cancelText}
            handleCancel={onClose}
            type={type}
            handleSubmit={handleSubmit}
            loading={loading}
            okVariant={okVariant}
          />
        )}
      </>
    </CustomModal>
  );
};

export default ConfirmationModal;
