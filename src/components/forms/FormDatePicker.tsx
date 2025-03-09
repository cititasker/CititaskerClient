"use client";
import React from "react";
import { Box, FormControl, FormLabel, SxProps, Theme } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { cn } from "@/utils";
import FormError from "../reusables/FormError";
import { globalStyles } from "@/globalStyles";

interface IProps {
  name: string;
  label: string;
  labelStyle?: string;
  className?: string;
  [key: string]: any;
}

const style: Record<string, SxProps<Theme>> = {
  container: {
    ".MuiOutlinedInput-root": {
      px: "20px",
      ".MuiOutlinedInput-input": {
        pl: "0",
      },
    },
    ".MuiIconButton-root": {
      m: 0,
    },
    ...globalStyles.input,
  },
};

const FormDatePicker = ({
  name,
  label,
  labelStyle,
  className,
  ...rest
}: IProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Box sx={style.container} className={className}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormControl className="w-full">
          {label && (
            <FormLabel htmlFor={name} className={cn("label", labelStyle)}>
              {label}
            </FormLabel>
          )}
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <DatePicker
                value={field.value ? dayjs(field.value, "DD-MM-YYYY") : null}
                onChange={(date: Dayjs | null) => {
                  const formatedDate = date
                    ? dayjs(date).format("DD-MM-YYYY")
                    : "";
                  field.onChange(formatedDate);
                }}
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.date,
                  },
                }}
                {...rest}
              />
            )}
          />
        </FormControl>
        <FormError name={name} />
      </LocalizationProvider>
    </Box>
  );
};

export default FormDatePicker;
