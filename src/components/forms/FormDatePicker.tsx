"use client";

import React from "react";
import moment from "moment";
import { CalendarIcon } from "lucide-react";
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

interface FormDatePickerProps {
  name: string;
  label?: string;
  className?: string;
  labelClassName?: string;
  minDate?: Date;
  maxDate?: Date;
  triggerClass?: string;
  placeholder?: string;
}

export default function FormDatePicker({
  name,
  label,
  className,
  labelClassName,
  minDate,
  maxDate,
  triggerClass,
  placeholder = "Pick a date",
}: FormDatePickerProps) {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        const selectedDate = field.value
          ? moment(field.value, "DD-MM-YYYY").toDate()
          : null;

        return (
          <FormItem className={cn("w-full", className)}>
            {label && (
              <FormLabel htmlFor={name} className={labelClassName}>
                {label}
              </FormLabel>
            )}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full border-input justify-start text-left font-normal hover:bg-transparent shadow-none bg-transparent",
                    !field.value && "text-muted-foreground",
                    triggerClass
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value
                    ? moment(field.value, "DD-MM-YYYY").format("DD/MM/YYYY")
                    : placeholder}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 overflow-hidden"
                align="start"
                sideOffset={0}
              >
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
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
