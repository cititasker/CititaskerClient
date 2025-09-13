import React from "react";
import CustomModal from "@/components/reusables/CustomModal";
import { ITickCircle, ICloseCirle } from "@/constant/icons";

interface VerificationResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  success: boolean;
  message: string;
}

const VerificationResultModal: React.FC<VerificationResultModalProps> = ({
  isOpen,
  onClose,
  success,
  message,
}) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      // contentClassName="min-h-[496px] max-w-[496px] w-full flex items-center"
    >
      <div className="w-full h-full flex flex-col items-center justify-center">
        {success ? <ITickCircle /> : <ICloseCirle />}
        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold mb-2">
            {success ? "Congratulations!" : "Oops!"}
          </h2>
          <p>{message}</p>
        </div>
      </div>
    </CustomModal>
  );
};

export default VerificationResultModal;
