"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import FormButton from "@/components/forms/FormButton";
import FormTextArea from "@/components/forms/FormTextArea";
import CustomModal from "@/components/reusables/CustomModal";
import FormError from "@/components/reusables/FormError";
import Rating from "@/components/reusables/Rating";
import HandeShake from "@/assets/images/handshake.svg?url";

const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating"),
  comment: z.string().min(5, "Comment must be at least 5 characters"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface RatingModalProps extends IModal {
  taskerName: string;
  userName: string;
  initialRating?: number;
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
  onSubmit,
  showSuccess = false,
  isLoading = false,
}: RatingModalProps) {
  const methods = useForm<ReviewFormData>({
    defaultValues: {
      rating: initialRating,
      comment: "",
    },
    resolver: zodResolver(reviewSchema),
  });

  const { control, setValue, handleSubmit, reset } = methods;

  useEffect(() => {
    if (initialRating > 0) {
      setValue("rating", initialRating, { shouldValidate: true });
    }
  }, [initialRating, setValue]);

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <CustomModal isOpen={isOpen} onClose={handleClose}>
      {showSuccess ? (
        <div className="flex h-full justify-center items-center p-6">
          <div className="space-y-4 text-center">
            <Image
              src={HandeShake}
              alt="Handshake"
              className="mx-auto w-[80%] sm:w-full"
            />
            <p className="text-lg">Thank you for sharing your review</p>
          </div>
        </div>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                Hi {userName} 👋
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                How would you rate your experience with{" "}
                <span className="font-medium text-neutral-900">
                  {taskerName}
                </span>
                ?
              </p>
            </div>

            <Controller
              name="rating"
              control={control}
              render={({ field, fieldState }) => (
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <Rating
                      value={field.value}
                      onChange={field.onChange}
                      size={window.innerWidth < 640 ? 32 : 40}
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

            <FormTextArea
              name="comment"
              placeholder="Share your experience (optional)"
              rows={4}
              className="resize-none"
            />

            <FormButton
              type="submit"
              className="w-full"
              loading={isLoading}
              disabled={isLoading}
            >
              Submit Review
            </FormButton>
          </form>
        </FormProvider>
      )}
    </CustomModal>
  );
}
