import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FaqItem from "./FaqItem";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ActionsButtons from "@/components/reusables/ActionButtons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { updateFaq } from "@/services/user/users.api";
import { API_ROUTES } from "@/constant";
import { useAppSelector } from "@/store/hook";

interface IProps {
  faq: UserFaq;
  handleCancel: () => void;
}

const schema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
});
type schemaType = z.infer<typeof schema>;

export default function EditSingleFaq({ faq, handleCancel }: IProps) {
  const queryClient = useQueryClient();
  const { user } = useAppSelector((state) => state.user);
  const { showSnackbar } = useSnackbar();
  const methods = useForm<schemaType>({
    defaultValues: { question: "", answer: "" },
    resolver: zodResolver(schema),
  });

  const updateMutation = useMutation({
    mutationFn: updateFaq,
    onSuccess(data) {
      showSnackbar(data.message, "success");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.GET_FAQ, user.id],
      });
      handleCancel();
    },
    onError(error) {
      showSnackbar(error.message, "error");
    },
  });

  useEffect(() => {
    methods.setValue("answer", faq.answer);
    methods.setValue("question", faq.question);
  }, [faq]);

  const onSubmit = (values: schemaType) => {
    updateMutation.mutate({ id: faq.id, data: values });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FaqItem question="question" answer="answer" />
        <ActionsButtons
          cancelText="Cancel"
          okText="Save"
          handleCancel={handleCancel}
          type="submit"
          className="mt-[10px] max-w-[250px] sm:gap-x-2 ml-auto"
          size="lg"
          loading={updateMutation.isPending}
        />
      </form>
    </FormProvider>
  );
}
