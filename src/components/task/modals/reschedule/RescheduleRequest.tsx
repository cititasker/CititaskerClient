import ExtraInfo from "@/components/forms/ExtraInfo";
import FormDatePicker from "@/components/forms/FormDatePicker";
import FormSelect from "@/components/forms/FormSelect";
import ActionsButtons from "@/components/reusables/ActionButtons";
import { SelectItem } from "@/components/ui/select";
import { FORMATTED_OPTIONS } from "@/constant";
import { useAppSelector } from "@/store/hook";
import { formatISODate } from "@/utils";
import React, { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface IProps {
  onNext?: () => void;
  onReschedule: () => void;
  name?: string;
  onAccept: () => void;
  loading: boolean;
}

export default function RescheduleRequest({
  onReschedule,
  onAccept,
  name,
  loading,
}: IProps) {
  const { taskDetails: task } = useAppSelector((s) => s.task);

  // Calculate default values from task data
  const defaultValues = useMemo(() => {
    if (task?.reschedule) {
      return {
        newDate: formatISODate(task.reschedule.proposed_date),
        newTime: task.reschedule.proposed_time,
      };
    }
    return {
      newDate: "",
      newTime: "",
    };
  }, [task?.reschedule]);

  const methods = useForm({
    defaultValues,
  });

  // Reset form when defaultValues change
  useEffect(() => {
    methods.reset(defaultValues);
  }, [defaultValues, methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onAccept)} className="">
        <div className="space-y-4">
          <p className="text-black-2 disabled:placeholder:text-black-2">
            {name} is requesting to reschedule the task "{task?.name}".
          </p>
          <FormDatePicker
            name="newDate"
            label="New date"
            disabled
            trigerClassName="disabled:opacity-100"
          />
          <FormSelect
            name="newTime"
            label="New time"
            disabled
            options={FORMATTED_OPTIONS}
            renderOption={(opt) => (
              <SelectItem key={opt.id} value={String(opt.id)}>
                {opt.name} {opt.description && `(${opt.description})`}
              </SelectItem>
            )}
            triggerClassName="disabled:opacity-100"
          />

          <ExtraInfo>
            By accepting this request, you agree to change the task due date to
            the new date.
          </ExtraInfo>
          <ActionsButtons
            cancelText="Pick a date"
            okText="Accept"
            handleCancel={onReschedule}
            loading={loading}
          />
        </div>
      </form>
    </FormProvider>
  );
}
