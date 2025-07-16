"use client";

import CustomModal from "@/components/reusables/CustomModal";
import React from "react";
import Image from "next/image";

interface SubmitSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubmitSuccessModal: React.FC<SubmitSuccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} contentClassName="max-w-[400px]">
      <div className="p-6 flex flex-col items-center justify-center text-center space-y-4">
        <Image
          src="/images/modalpics.svg"
          alt="Handshake"
          width={150}
          height={150}
        />
        <p className="text-lg font-medium">Thank you for sharing your review</p>
      </div>
    </CustomModal>
  );
};

export default SubmitSuccessModal;
