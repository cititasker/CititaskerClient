"use client";

import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Image from "next/image";

import CustomModal from "@/components/reusables/CustomModal";
import FormButton from "@/components/forms/FormButton";
import FormTextArea from "@/components/forms/FormTextArea";
import FormError from "@/components/reusables/FormError";
import Rating from "@/components/reusables/Rating";

import HandeShake from "@/assets/images/handshake.svg?url";

const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating"),
  comment: z.string().min(5, "Comment must be at least 5 characters"),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;

interface RatingModalProps extends IModal {
  taskerName: string;
  userName: string;
  initialRating?: number;
  initialComment?: string;
  isEditMode?: boolean;
  onSubmit: (data: ReviewFormData) => void;
  showSuccess?: boolean;
  isLoading?: boolean;
}

export default function RatingModal({
  isOpen,
  onClose,
  taskerName,
  userName,
  initialRating = 0,
  initialComment = "",
  isEditMode,
  onSubmit,
  showSuccess = false,
  isLoading = false,
}: RatingModalProps) {
  const methods = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
    mode: "onSubmit",
  });

  const { control, handleSubmit, reset } = methods;

  /**
   * Hydrate form when modal opens
   * Works for both create & edit flows
   */
  useEffect(() => {
    if (!isOpen) return;

    reset({
      rating: initialRating || 0,
      comment: initialComment || "",
    });
  }, [isOpen, initialRating, initialComment, reset]);

  const handleClose = () => {
    onClose();
    reset({
      rating: 0,
      comment: "",
    });
  };

  const successMessage = isEditMode
    ? "Your review has been updated successfully"
    : "Thank you for sharing your review";

  return (
    <CustomModal isOpen={isOpen} onClose={handleClose}>
      {showSuccess ? (
        <div className="flex h-full items-center justify-center p-6">
          <div className="space-y-4 text-center">
            <Image
              src={HandeShake}
              alt="Handshake"
              className="mx-auto h-[250px] sm:w-full"
            />
            <p className="text-lg font-medium">{successMessage}</p>
          </div>
        </div>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                Hi {userName} 👋
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                {isEditMode
                  ? "You’re updating your review for "
                  : "How would you rate your experience with "}
                <span className="font-medium text-neutral-900">
                  {taskerName}
                </span>
                ?
              </p>
            </div>

            {/* Rating */}
            <Controller
              name="rating"
              control={control}
              render={({ field, fieldState }) => (
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <Rating
                      value={field.value}
                      onChange={field.onChange}
                      size={40}
                      className="gap-3 sm:gap-4"
                    />
                  </div>

                  {fieldState.error && (
                    <FormError
                      name="rating"
                      className="text-center text-xs sm:text-sm"
                    />
                  )}
                </div>
              )}
            />

            {/* Comment */}
            <FormTextArea
              name="comment"
              placeholder="Share your experience"
              rows={4}
              className="resize-none"
            />

            {/* Submit */}
            <FormButton
              type="submit"
              className="w-full"
              loading={isLoading}
              disabled={isLoading}
            >
              {isEditMode ? "Update Review" : "Submit Review"}
            </FormButton>
          </form>
        </FormProvider>
      )}
    </CustomModal>
  );
}
