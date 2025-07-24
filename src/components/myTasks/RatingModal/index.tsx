import FormButton from "@/components/forms/FormButton";
import FormTextArea from "@/components/forms/FormTextArea";
import CustomModal from "@/components/reusables/CustomModal";
import FormError from "@/components/reusables/FormError";
import Rating from "@/components/reusables/Rating";
import { useAppSelector } from "@/store/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import Success from "./Success";
import { useScreenBreakpoints } from "@/hooks/useScreenBreakpoints";

const schema = z.object({
  rating: z.number().min(1, "Please select rating"),
  comment: z.string().min(5, "Please write a comment"),
});

type SchemaType = z.infer<typeof schema>;

interface IProps extends IModal {
  name: string;
  rating: number;
  onSubmit: (data: SchemaType) => void;
  success?: boolean;
  loading?: boolean;
}

export default function RatingModal({
  isOpen,
  onClose,
  name,
  rating,
  onSubmit,
  success = false,
  loading = false,
}: IProps) {
  const { user } = useAppSelector((state) => state.user);
  const { isSmallScreen, isMediumScreen } = useScreenBreakpoints();
  const size = isSmallScreen ? 30 : 45;

  const methods = useForm<SchemaType>({
    defaultValues: {
      rating: 0,
      comment: "",
    },
    resolver: zodResolver(schema),
  });

  const { control, setValue, handleSubmit, reset } = methods;

  useEffect(() => {
    setValue("rating", rating, { shouldValidate: true });
  }, [rating]);

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={handleClose}
      contentClassName="max-w-[500px]"
    >
      {!success ? (
        <FormProvider {...methods}>
          <form className="md:mt-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl mb-2 sm:mb-4 text-black-2 font-semibold">
                Hi {`${user.first_name} ${user.last_name}`} 👋
              </h2>
              <p className="text-sm sm:text-base text-black-2">
                How would you rate your experience with {name}?
              </p>
            </div>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <div className="my-4 sm:my-6 md:my-10">
                  <Rating
                    value={field.value}
                    onChange={field.onChange}
                    size={size}
                    className="flex justify-center"
                  />
                  <FormError name="rating" className="text-center mt-0" />
                </div>
              )}
            />
            <FormTextArea
              name="comment"
              placeholder="Add additional comment here (Optional)"
              className="px-4"
            />
            <FormButton
              type="submit"
              size="lg"
              className="w-full mt-4"
              loading={loading}
            >
              Submit
            </FormButton>
          </form>
        </FormProvider>
      ) : (
        <Success />
      )}
    </CustomModal>
  );
}
