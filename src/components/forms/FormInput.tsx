"use client";
import React from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  SxProps,
  TextField,
  Theme,
} from "@mui/material";
import { cn } from "@/utils";
import { globalStyles } from "@/globalStyles";

interface IProps {
  label?: string;
  type?: string;
  name: string;
  placeholder?: string;
  inputstyle?: string;
  wrapperStyle?: string;
  labelStyle?: string;
  disabled?: boolean;
  sx?: any;
  InputProps?: any;
  [key: string]: any;
}

const style: Record<string, SxProps<Theme>> | any = {
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

const FormInput = ({
  label,
  type = "text",
  name,
  placeholder,
  labelStyle,
  wrapperStyle,
  disabled = false,
  sx,
  InputProps,
  ...rest
}: IProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <FormControl
      fullWidth
      sx={{ ...style.container, ...sx }}
      disabled={disabled}
      {...rest}
      className={cn("w-full mb-5 flex-1", wrapperStyle)}
    >
      {label && (
        <FormLabel htmlFor={name} className={cn("label", labelStyle)}>
          {label}
        </FormLabel>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            id={name}
            fullWidth
            sx={style}
            error={errors.hasOwnProperty(name)}
            helperText={errors[name]?.message as any}
            disabled={disabled}
            {...field}
            type={
              type === "password"
                ? showPassword
                  ? "text"
                  : "password"
                : "text"
            }
            variant="outlined"
            placeholder={placeholder}
            InputProps={
              InputProps ?? {
                endAdornment: type === "password" && (
                  <InputAdornment position="end" sx={{ ml: 0 }}>
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      className="absolute right-5"
                    >
                      {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  ".MuiOutlinedInput-input": {
                    pl: "20px",
                    py: 0,
                    height: "48px",
                    pr: `${type == "password" ? "45px" : "20px"}`,
                  },
                },
              }
            }
            {...rest}
          />
        )}
      />
    </FormControl>
  );
};

export default FormInput;
