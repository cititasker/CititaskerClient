"use client";

import RescheduleForm from "./RescheduleForm";
import { UseModalReturn } from "@/constant/interface";
import {
  FieldValues,
  SubmitHandler,
  DefaultValues,
  Path,
} from "react-hook-form";

export interface Step1FieldNames<T extends FieldValues> {
  date: Path<T>;
  time: Path<T>;
  showTimeOfDay: Path<T>;
}

interface RescheduleRejectProps<T extends FieldValues> {
  modal: UseModalReturn;
  schema: any;
  defaultValues: DefaultValues<T>;
  fieldNames: Step1FieldNames<T>;

  loading?: boolean;

  onSubmit: SubmitHandler<T>;
  canReschedule: boolean;

  back?: () => void;
}

export default function RescheduleReject<T extends FieldValues>({
  modal,
  schema,
  defaultValues,
  fieldNames,
  loading,
  onSubmit,
  canReschedule,
  back,
}: RescheduleRejectProps<T>) {
  const resetModal = () => {
    modal.closeModal();
  };

  if (!canReschedule) return null;

  return (
    <RescheduleForm<T>
      schema={schema}
      defaultValues={defaultValues}
      fieldNames={fieldNames}
      loading={loading}
      onSubmit={onSubmit}
      onClose={resetModal}
      back={back}
    />
  );
}
