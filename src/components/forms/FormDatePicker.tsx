"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

// Enable custom parse format plugin
dayjs.extend(customParseFormat);

interface FormDatePickerProps {
  name: string;
  label?: string;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  trigerClassName?: string;
  displayFormat?: string;
}

const DATE_FORMAT = "DD-MM-YYYY";
const DISPLAY_FORMAT = "DD/MM/YYYY";

export default function FormDatePicker({
  name,
  label,
  className,
  minDate,
  maxDate,
  placeholder = "Select a date",
  disabled = false,
  required = false,
  trigerClassName,
  displayFormat = DISPLAY_FORMAT,
}: FormDatePickerProps) {
  const { control, formState } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const error = formState.errors[name];

  const parseDate = (value: string) => {
    if (!value) return null;
    const parsed = dayjs(value, DATE_FORMAT, true); // strict parsing
    return parsed.isValid() ? parsed.toDate() : null;
  };

  const isDateDisabled = (date: Date) => {
    const currentDate = dayjs(date).startOf("day");

    if (minDate && currentDate.isBefore(dayjs(minDate).startOf("day")))
      return true;
    if (maxDate && currentDate.isAfter(dayjs(maxDate).endOf("day")))
      return true;
    return false;
  };

  const handleDateSelect = (
    date: Date | undefined,
    onChange: (value: string) => void
  ) => {
    if (date) {
      onChange(dayjs(date).format(DATE_FORMAT));
      setIsOpen(false);
    }
  };

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        const selectedDate = parseDate(field.value);

        return (
          <FormItem className={className}>
            {label && (
              <FormLabel
                htmlFor={name}
                className="text-sm font-medium text-text-primary"
              >
                {label}
                {required && <span className="text-error ml-1">*</span>}
              </FormLabel>
            )}

            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={disabled}
                  className={cn(
                    "w-full h-12 px-4 shadow-none rounded-xl border justify-start font-normal transition-all duration-200",
                    "bg-background hover:bg-background focus:ring-0 focus:ring-ring ring-offset-1",
                    error && "border-error focus:border-error",
                    !field.value && "text-text-muted",
                    field.value && "text-text-primary",
                    disabled && "cursor-not-allowed",
                    trigerClassName
                  )}
                >
                  <CalendarIcon className="h-4 w-4 text-text-muted" />
                  {selectedDate
                    ? dayjs(selectedDate).format(displayFormat)
                    : placeholder}
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className="w-auto p-0 bg-background border-border-light rounded-xl shadow-lg"
                align="start"
                sideOffset={2}
              >
                <Calendar
                  mode="single"
                  selected={selectedDate || undefined}
                  onSelect={(date) => handleDateSelect(date, field.onChange)}
                  disabled={isDateDisabled}
                  defaultMonth={!field.value && maxDate ? maxDate : undefined}
                  captionLayout="dropdown"
                  initialFocus
                  className="rounded-xl"
                />
              </PopoverContent>
            </Popover>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
