import React from "react";
import { ConfirmModal } from "./ConfirmModal";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  loading?: boolean;
  handleSubmit: () => void;
  text?: string;
  desc?: string;
  okText?: string;
  cancelText?: string;
  children?: React.ReactNode;
  showIcon?: any;
}
export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  loading,
  handleSubmit,
  text,
  desc,
  okText = "Delete",
  cancelText = "Cancel",
  children = undefined,
  showIcon = false,
}: IProps) {
  const title = text || "Are you sure?";
  const description =
    desc ||
    "You want to delete the selected item? Note: This action is irreversible and will permanently delete the selection";
  return (
    <ConfirmModal
      open={isOpen}
      onClose={onClose}
      variant="destructive"
      title={title}
      description={description}
      cancelText={cancelText}
      confirmText={okText}
      loading={loading}
      onConfirm={handleSubmit}
    >
      {children}
    </ConfirmModal>
  );
}
