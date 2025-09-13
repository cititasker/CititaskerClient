"use client";

import React, { useState } from "react";
import { format, parse, isValid } from "date-fns";
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

interface FormDatePickerProps {
  name: string;
  label?: string;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function FormDatePicker({
  name,
  label,
  className,
  minDate,
  maxDate,
  placeholder = "Select a date",
  disabled = false,
  required = false,
}: FormDatePickerProps) {
  const { control, formState } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const error = formState.errors[name];

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        // Parse the date value
        const selectedDate = field.value
          ? parse(field.value, "dd-MM-yyyy", new Date())
          : null;

        const isValidDate = selectedDate && isValid(selectedDate);

        return (
          <FormItem className={cn("space-y-2", className)}>
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
                    // Base styles
                    "w-full h-12 px-4 shadow-none text-base rounded-xl border justify-start font-normal transition-all duration-200",
                    "bg-background hover:bg-background",

                    // Border states
                    error
                      ? "border-error focus:border-error"
                      : "border-border-light focus:border-primary hover:border-border-medium",

                    // Text states
                    !field.value && "text-text-muted",
                    field.value && "text-text-primary",

                    // State styles
                    disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <CalendarIcon className="mr-3 h-4 w-4 text-text-muted" />
                  {isValidDate
                    ? format(selectedDate, "dd/MM/yyyy")
                    : placeholder}
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className="w-auto p-0 bg-background border-border-light rounded-xl shadow-lg"
                align="start"
                sideOffset={4}
              >
                <Calendar
                  mode="single"
                  selected={isValidDate ? selectedDate : undefined}
                  onSelect={(date) => {
                    if (date) {
                      const formatted = format(date, "dd-MM-yyyy");
                      field.onChange(formatted);
                    }
                    setIsOpen(false);
                  }}
                  disabled={(date) => {
                    if (minDate && date < minDate) return true;
                    if (maxDate && date > maxDate) return true;
                    return false;
                  }}
                  defaultMonth={!field.value && maxDate ? maxDate : undefined}
                  captionLayout="dropdown"
                  initialFocus
                  className="rounded-xl"
                />
              </PopoverContent>
            </Popover>

            <FormMessage className="text-error text-sm" />
          </FormItem>
        );
      }}
    />
  );
}
