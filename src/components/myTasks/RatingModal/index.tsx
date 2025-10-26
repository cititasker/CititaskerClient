"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import FormButton from "@/components/forms/FormButton";
import FormTextArea from "@/components/forms/FormTextArea";
import CustomModal from "@/components/reusables/CustomModal";
import FormError from "@/components/reusables/FormError";
import Rating from "@/components/reusables/Rating";
import { useAppSelector } from "@/store/hook";
import Success from "./Success";

const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating"),
  comment: z.string().min(5, "Comment must be at least 5 characters"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface RatingModalProps extends IModal {
  taskerName: string;
  initialRating?: number;
  onSubmit: (data: ReviewFormData) => void;
  showSuccess?: boolean;
  isLoading?: boolean;
}

export default function RatingModal({
  isOpen,
  onClose,
  taskerName,
  initialRating = 0,
  onSubmit,
  showSuccess = false,
  isLoading = false,
}: RatingModalProps) {
  const { user } = useAppSelector((state) => state.user);
  const userName = `${user.first_name} ${user.last_name}`;

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

  if (showSuccess) {
    return (
      <CustomModal isOpen={isOpen} onClose={handleClose}>
        <Success />
      </CustomModal>
    );
  }

  return (
    <CustomModal isOpen={isOpen} onClose={handleClose}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              Hi {userName} 👋
            </h2>
            <p className="text-sm sm:text-base text-neutral-600">
              How would you rate your experience with{" "}
              <span className="font-medium text-neutral-900">{taskerName}</span>
              ?
            </p>
          </div>

          {/* Rating Input */}
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

          {/* Comment Input */}
          <FormTextArea
            name="comment"
            placeholder="Share your experience (optional)"
            rows={4}
            className="resize-none"
          />

          {/* Submit Button */}
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
    </CustomModal>
  );
}
