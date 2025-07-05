"use client";

import React from "react";
import moment from "moment";
import { CalendarIcon } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import FormError from "../reusables/FormError";
import { cn } from "@/lib/utils";

interface FormDatePickerProps {
  name: string;
  label?: string;
  className?: string;
  labelClassName?: string;
  minDate?: Date;
  maxDate?: Date;
  triggerClass?: string;
}

export default function FormDatePicker({
  name,
  label,
  className,
  labelClassName,
  minDate,
  maxDate,
  triggerClass,
}: FormDatePickerProps) {
  const { control } = useFormContext();

  return (
    <div className={cn("space-y-2 w-full", className)}>
      {label && (
        <Label
          htmlFor={name}
          className={cn("block text-sm font-medium", labelClassName)}
        >
          {label}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedDate = field.value
            ? moment(field.value, "DD-MM-YYYY").toDate()
            : null;

          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal hover:bg-transparent shadow-none h-[50px]",
                    !field.value && "text-muted-foreground",
                    triggerClass
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value
                    ? moment(field.value, "DD-MM-YYYY").format("DD/MM/YYYY")
                    : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  selected={selectedDate ?? undefined}
                  onSelect={(date) => {
                    if (date) {
                      const formatted = moment(date).format("DD-MM-YYYY");
                      field.onChange(formatted);
                    }
                  }}
                  autoFocus
                  disabled={(date) => {
                    const beforeMin =
                      !!minDate && moment(date).isBefore(minDate, "day");
                    const afterMax =
                      !!maxDate && moment(date).isAfter(maxDate, "day");
                    return beforeMin || afterMax;
                  }}
                />
              </PopoverContent>
            </Popover>
          );
        }}
      />

      <FormError name={name} />
    </div>
  );
}
