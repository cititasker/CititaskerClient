"use client";

import React from "react";
import moment from "moment";
import { CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import useToggle from "@/hooks/useToggle";
import FormError from "../reusables/FormError";

interface CustomDateTimePickerProps {
  name: string; // e.g. "dateTime.date"
  label?: string;
  showTimePicker?: boolean;
  className?: string;
  labelClassName?: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  triggerClass?: string;
}

export default function CustomDateTimePicker({
  name,
  label,
  showTimePicker = false,
  className,
  labelClassName,
  placeholder = "Pick a date",
  minDate,
  maxDate,
  triggerClass,
}: CustomDateTimePickerProps) {
  const { getValues, control } = useFormContext();
  const open = useToggle();

  const currentDate = getValues(`${name}.date`);
  const currentTime = showTimePicker ? getValues(`${name}.time`) : null;

  const formattedValue = () => {
    if (!currentDate) return placeholder;
    const date = moment(currentDate, "DD-MM-YYYY").format("DD/MM/YYYY");
    const time = currentTime
      ? moment(currentTime, "HH:mm:ss").format("hh:mm A")
      : "";
    return time ? `${date} - ${time}` : date;
  };

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        const selectedDate = field.value?.date
          ? moment(field.value.date, "DD-MM-YYYY").toDate()
          : null;

        return (
          <FormItem>
            {label && (
              <FormLabel htmlFor={name} className={labelClassName}>
                {label}
              </FormLabel>
            )}
            <DropdownMenu open={open.isOpen} onOpenChange={open.setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full border-input justify-start text-left font-normal hover:bg-transparent shadow-none",
                    !field.value && "text-muted-foreground",
                    triggerClass
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formattedValue()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  selected={selectedDate ?? undefined}
                  onSelect={(date) => {
                    if (date) {
                      const formatted = moment(date).format("DD-MM-YYYY");
                      field.onChange({ ...field.value, date: formatted });
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
                {showTimePicker && (
                  <div className="flex items-center justify-between gap-3 px-4 mb-2">
                    <Label htmlFor="time-picker" className="text-sm">
                      Time:
                    </Label>
                    <Input
                      type="time"
                      id="time-picker"
                      step="1"
                      defaultValue={field.value?.time ?? ""}
                      onChange={(e) =>
                        field.onChange({
                          ...field.value,
                          time: e.target.value,
                        })
                      }
                      className="h-[2rem] w-fit rounded-md appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <FormMessage />
            {/* <FormError name={`${name}.date`} /> */}
          </FormItem>
        );
      }}
    />
  );
}
