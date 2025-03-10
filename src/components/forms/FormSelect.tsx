import { globalStyles } from "@/globalStyles";
import { cn } from "@/utils";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IProps {
  options: any[];
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  inputLabel?: boolean;
  sx?: any;
  multiple?: boolean;
  labelStyle?: string;
  [key: string]: any;
}

const style = {
  container: {
    ...globalStyles.input,
    ".MuiOutlinedInput-root": {
      border: "none",
      color: "var(--black)",
      pr: 0,
      borderRadius: "8px",
      fontSize: "16px",
      overflow: "hidden",
      height: "48px",

      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "1px solid",
        borderColor: "var(--primary)",
        boxShadow: "none",
      },
    },
  },
};

const FormSelect = ({
  options,
  name,
  label,
  required,
  placeholder,
  inputLabel,
  multiple,
  labelStyle,
}: IProps) => {
  const {
    control,
    formState: { errors: err },
  } = useFormContext();
  const errors = err as any;

  return (
    <FormControl fullWidth sx={style.container}>
      {label && !inputLabel && (
        <FormLabel className={cn("label block mb-2", labelStyle)}>
          {label} {required && <span className="required">*</span>}
        </FormLabel>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            variant="outlined"
            fullWidth
            displayEmpty
            {...field}
            multiple={multiple}
            label={inputLabel ? label : null}
          >
            <MenuItem value="" disabled>
              {placeholder}
            </MenuItem>
            {options?.map((el) => (
              <MenuItem key={el.id} value={`${el.id}`}>
                {el.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />

      <FormHelperText className="form__error">
        {errors[name]?.message}
      </FormHelperText>
    </FormControl>
  );
};

export default FormSelect;
