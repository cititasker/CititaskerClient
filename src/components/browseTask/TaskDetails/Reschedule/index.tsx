import CustomDateTimePicker from "@/components/forms/CustomDateTimePicker";
import ActionsButtons from "@/components/reusables/ActionButtons";
import { rescheduleTaskSchema, rescheduleTaskSchemaType } from "@/schema/task";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

interface IProps {
  onClose: () => void;
  next: () => void;
}

export default function Reschedule({ onClose, next }: IProps) {
  const methods = useForm<rescheduleTaskSchemaType>({
    defaultValues: {
      dateTime: { date: "", time: "" },
    },
    resolver: zodResolver(rescheduleTaskSchema),
  });
  const { handleSubmit, formState } = methods;

  console.log(formState.errors);

  const onSubmit = (data: any) => {
    console.log("Form submitted with data:", data);
    // Handle form submission logic here
    next();
  };
  return (
    <div className="flex flex-col h-full">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-full min-h-[350px]"
        >
          <CustomDateTimePicker
            name="dateTime"
            placeholder="Select a date and time"
            showTimePicker
          />
          <ActionsButtons
            okText="Next"
            handleCancel={onClose}
            className="mt-auto"
          />
        </form>
      </FormProvider>
    </div>
  );
}
