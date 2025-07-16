"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Rating from "../../reusables/Rating";
import { Textarea } from "../../ui/textarea";
import CustomModal from "@/components/reusables/CustomModal";
import SubmitSuccessModal from "./SubmitSuccessModal";


interface ClientReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { rating: number; comment: string }) => void;
  clientName: string;
  taskerName: string;
}

const ClientReviewModal = ({
  isOpen,
  onClose,
  onSubmit,
  clientName,
  taskerName,
}: ClientReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = () => {
    onSubmit({ rating, comment });    
    setShowSuccessModal(true);          
    setTimeout(() => {
      setShowSuccessModal(false);
      onClose();                    
    }, 3000);
  };

  return (
    <>
      <CustomModal isOpen={isOpen} onClose={onClose} contentClassName="max-w-[500px]">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-semibold">Hi {clientName} 👋</h2>
            <p className="text-sm text-gray-600">
              How would you rate your experience with {taskerName}?
            </p>
          </div>
          <Rating value={rating} onChange={setRating} size={50} className="flex justify-center" />
          <Textarea
            placeholder="Add additional comment here (Optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="rounded-[20px] h-24"
          />
          <Button onClick={handleSubmit} className="w-full mt-4">
            Submit
          </Button>
        </div>
      </CustomModal>

      <SubmitSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  );
};

export default ClientReviewModal;
