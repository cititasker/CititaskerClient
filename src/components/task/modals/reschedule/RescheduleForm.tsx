"use client";

import {
  FormProvider,
  useForm,
  FieldValues,
  SubmitHandler,
  DefaultValues,
  Path,
} from "react-hook-form";
import FormDatePicker from "@/components/forms/FormDatePicker";
import FormCheckbox from "@/components/forms/FormCheckbox";
import FormSelect from "@/components/forms/FormSelect";
import ActionsButtons from "@/components/reusables/ActionButtons";
import { SelectItem } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { FORMATTED_OPTIONS } from "@/constant";

export interface FieldNames<T extends FieldValues> {
  date: Path<T>;
  time: Path<T>;
  showTimeOfDay: Path<T>;
}

interface RescheduleFormProps<T extends FieldValues> {
  schema: any;
  defaultValues: DefaultValues<T>;
  fieldNames: FieldNames<T>;
  placeholder?: string;
  loading?: boolean;
  onSubmit: SubmitHandler<T>;
  onClose: () => void;
  back?: () => void;
}

export default function RescheduleForm<T extends FieldValues = FieldValues>({
  schema,
  defaultValues,
  fieldNames,
  placeholder = "Select date",
  loading,
  onSubmit,
  onClose,
  back,
}: RescheduleFormProps<T>) {
  const methods = useForm<T>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const { handleSubmit, watch } = methods;

  const showTimeOfDay = watch(fieldNames.showTimeOfDay);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col flex-1 min-h-0"
      >
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
          <div className="flex flex-col gap-y-4">
            <FormDatePicker
              name={fieldNames.date}
              placeholder={placeholder}
              minDate={new Date()}
            />

            <FormCheckbox name={fieldNames.showTimeOfDay} label="Pick a time" />

            {showTimeOfDay && (
              <FormSelect
                name={fieldNames.time}
                options={FORMATTED_OPTIONS}
                renderOption={(opt) => (
                  <SelectItem key={opt.id} value={String(opt.id)}>
                    {opt.name} {opt.description && `(${opt.description})`}
                  </SelectItem>
                )}
              />
            )}
          </div>
        </div>

        <div className="shrink-0 pt-4">
          <ActionsButtons
            okText="Send"
            cancelText={back ? "Back" : "Cancel"}
            handleCancel={() => {
              if (back) back?.();
              else onClose();
            }}
            loading={loading}
          />
        </div>
      </form>
    </FormProvider>
  );
}
