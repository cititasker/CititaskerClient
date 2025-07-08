import React from "react";
import FormButton from "@/components/forms/FormButton";
import { Plus } from "lucide-react";
import ActionsButtons from "@/components/reusables/ActionButtons";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FaqItem from "./FaqItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFaq } from "@/services/user/users.api";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { useAppSelector } from "@/store/hook";
import { API_ROUTES } from "@/constant";

const schema = z.object({
  faqs: z.array(
    z.object({
      question: z.string().min(1, "Please write a question"),
      answer: z.string().min(1, "Please provide an answer to the question"),
    })
  ),
});

type schemaType = z.infer<typeof schema>;

interface IProps {
  handleCancel: () => void;
}

export default function EditFAQ({ handleCancel }: IProps) {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { user } = useAppSelector((state) => state.user);

  const mutation = useMutation({
    mutationFn: createFaq,
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
  const methods = useForm<schemaType>({
    defaultValues: {
      faqs: [{ question: "", answer: "" }],
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, control } = methods;
  const { fields, append, remove } = useFieldArray<schemaType>({
    name: "faqs",
    control,
  });

  const addFAQ = () => {
    append({ question: "", answer: "" });
  };

  const removeFaq = (index: number) => {
    remove(index);
  };

  const onSubmit = (values: schemaType) => {
    console.log(values);
    mutation.mutate(values);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-[30px] space-y-5">
          {fields.map((v, index) => (
            <FaqItem
              key={v.id}
              question={`faqs[${index}].question`}
              answer={`faqs[${index}].answer`}
              index={index}
              removeFaq={removeFaq}
            />
          ))}
        </div>
        <FormButton
          icon={<Plus />}
          text="Add Faq"
          variant="nude"
          className="p-1 text-xs font-semibold text-primary h-fit"
          onClick={addFAQ}
        />
        <ActionsButtons
          cancelText="Cancel"
          okText="Save"
          handleCancel={handleCancel}
          type="submit"
          className="mt-[56px]"
          loading={mutation.isPending}
        />
      </form>
    </FormProvider>
  );
}
