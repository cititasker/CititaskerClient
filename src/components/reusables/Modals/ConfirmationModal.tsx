import React from "react";
import CustomModal from "../CustomModal";
import theme from "@/providers/theme";
import ActionsButtons from "../ActionButtons";

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
}: IProps) => {
  return (
    <CustomModal
      isOpen={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      paperStyle={{
        maxWidth: "560px",
        p: "20px",
        [theme.breakpoints.up("sm")]: {
          px: "34px",
          py: "24px",
          borderRadius: "40px",
        },
      }}
    >
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
          />
        )}
      </>
    </CustomModal>
  );
};

export default ConfirmationModal;
