"use client";
import {
  taskerWaitListFormSchema,
  taskerWaitListFormSchemaType,
} from "@/schema/waitlist";
import React, { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import FormInput from "../forms/FormInput";
import FormButton from "../forms/FormButton";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { getCategories, joinTaskerApi } from "@/services";
import FormAutoComplete from "../forms/FormAutoComplete";
import { capitalize } from "@/utils";

interface IProps {
  toggleSuccessModal: () => void;
}

const TaskerWaitListForm = ({ toggleSuccessModal }: IProps) => {
  const { showSnackbar } = useSnackbar();
  const [categories, setCategories] = useState<ITaskCategory[]>([]);

  const categoryList = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const result: ITaskCategory[] = categoryList.data || [];

  useEffect(() => {
    if (result.length && !categories.length) {
      const data = formatData(result);
      setCategories(data);
    }
  }, [result]);

  const formatData = (data: ITaskCategory[]) => {
    return data.map((el) => ({ ...el, name: capitalize(el.name) }));
  };

  const methods = useForm<taskerWaitListFormSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      occupation: null,
    },
    resolver: zodResolver(taskerWaitListFormSchema),
  });

  const mutation = useMutation({
    mutationFn: joinTaskerApi,
    onSuccess: () => {
      toggleSuccessModal();
    },
    onError(error) {
      showSnackbar(error.message, "error");
    },
  });

  const onSubmit: SubmitHandler<taskerWaitListFormSchemaType> = (values) => {
    const payload = {
      ...values,
      occupation: values.occupation?.id,
    };
    mutation.mutate(payload);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between gap-x-8 gap-y-5 flex-col sm:flex-row mb-5">
          <FormInput
            label="Full Name"
            name="name"
            type="text"
            placeholder="Enter your first name"
            wrapperStyle="!mb-0"
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            wrapperStyle="!mb-0"
          />
        </div>

        <div className="flex items-center justify-between gap-x-8 gap-y-5 flex-col sm:flex-row mb-5 !rounded-full">
          <FormAutoComplete
            label="What type of service will you provide?"
            options={categories}
            getOptionLabel={(option: any) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            name="occupation"
            placeholder="Select service category"
            className="!rounded-full"
          />
        </div>

        <FormButton
          type="submit"
          text="Join Waitlist"
          className="!w-full !h-[3.375rem] mt-[2.5rem]"
          loading={mutation.isPending}
        />
      </form>
    </FormProvider>
  );
};

export default TaskerWaitListForm;
