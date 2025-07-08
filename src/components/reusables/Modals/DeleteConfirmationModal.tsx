import React from "react";
import ConfirmationModal from "./ConfirmationModal";
import { TriangleAlert } from "lucide-react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  loading?: boolean;
  handleSubmit: () => void;
  text?: string;
  desc?: string;
  okText?: string;
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
  children,
  showIcon = false,
}: IProps) {
  const title = text || "Are you sure?";
  const belowText =
    desc ||
    "You want to delete the selected item? Note: This action is irreversible and will permanently delete the selection";
  return (
    <ConfirmationModal
      open={isOpen}
      onClose={onClose}
      okVariant="outline"
      cancelVariant="default"
      cancelStyle=""
      okStyle="text-red-state-color border-red-state-color bg-red-state-color-fill"
      okText={okText}
      loading={loading}
      handleSubmit={handleSubmit}
      containerClass="max-w-[496px]"
    >
      {children ?? (
        <div className="w-fit flex flex-col items-center text-center mb-10 mx-auto">
          {showIcon ? (
            <div className="mb-5">
              <TriangleAlert
                strokeWidth={1}
                size={70}
                className="text-destructive"
              />
            </div>
          ) : null}
          <div>
            <h1 className="text-2xl mb-4">{title}</h1>
            <p>{belowText}</p>
          </div>
        </div>
      )}
    </ConfirmationModal>
  );
}
