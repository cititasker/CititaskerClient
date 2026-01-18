import ActionsButtons from "@/components/reusables/ActionButtons";
import CustomModal from "@/components/reusables/CustomModal";
import React from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: () => void;
}

export default function HelpModal({ isOpen, onClose, handleSubmit }: IProps) {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Help"
      titleClassName="text-center"
      customFooter={
        <ActionsButtons
          handleCancel={onClose}
          okText="Open dispute"
          type="button"
          handleSubmit={handleSubmit}
        />
      }
    >
      <div className="space-y-7 text-black-2">
        <p>
          If you have any issues with your Tasker, we encourage you to contact
          the Tasker first. If you can't reach an agreement with the Tasker, you
          can open a dispute form.
        </p>
        <p>
          If you think that a Tasker has violated CitiTasker community
          guidelines, you should report to our team by clicking on the flag icon
          on the Tasker’s profile. This will help us to make sure that you have
          a better experience on CitiTasker.
        </p>
      </div>
    </CustomModal>
  );
}
