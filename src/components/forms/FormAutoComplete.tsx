"use client";
import { globalStyles } from "@/globalStyles";
import {
  Autocomplete,
  Box,
  FormControl,
  FormLabel,
  SxProps,
  TextField,
  Theme,
} from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IProps<T> {
  options: T[];
  label?: string;
  disabled?: boolean;
  name: string;
  placeholder?: string;
  onChange?: (event: any, value: T | null) => void; // Add onChange prop for external handlers
  value?: T;
  getOptionLabel: (option: T) => string;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: T
  ) => React.ReactNode;
  isOptionEqualToValue?: (option: T, value: T) => boolean;
  [key: string]: any;
}

const styles: Record<string, SxProps<Theme>> | any = {
  container: {
    mb: "15px",

    ".required": {
      color: "rgba(217, 63, 33, 1)",
      fontSize: "13.7px",
      fontWeight: "500",
      lineHeight: "20.48px",
      textAlign: "left",
    },
    ...globalStyles.input,
  },
};

const FormAutoComplete = <T,>({
  options,
  label,
  disabled,
  name,
  placeholder,
  getOptionLabel,
  renderOption,
  isOptionEqualToValue,
  onChange,
  value,
  ...rest
}: IProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl fullWidth sx={styles.container} className="w-full flex-1 mb-5">
      <FormLabel htmlFor={label} className="label">
        {label}
      </FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            disablePortal
            fullWidth
            id={label}
            options={options}
            getOptionLabel={getOptionLabel}
            renderOption={renderOption}
            isOptionEqualToValue={isOptionEqualToValue}
            // sx={{ width: "100%", "& .MuiOutlinedInput-root": { pl: "20px" } }}
            disabled={disabled}
            onChange={(_, value) => {
              if (onChange) onChange(_, value);
              field.onChange(value);
            }}
            renderInput={(params: any) => {
              return (
                <TextField
                  {...params}
                  placeholder={placeholder}
                  error={errors.hasOwnProperty(name)}
                  helperText={errors[name]?.message}
                />
              );
            }}
          />
        )}
      />
    </FormControl>
  );
};

export default FormAutoComplete;
