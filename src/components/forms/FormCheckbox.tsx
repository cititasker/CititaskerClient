"use client";
import { Checkbox, FormControlLabel, SxProps, Theme } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import FormError from "../reusables/FormError";

interface IProps {
  name: string;
  label: any;
  className?: string;
}

const style: Record<string, SxProps<Theme>> = {
  container: {
    ".MuiSvgIcon-root": {
      borderRadius: "12px",
    },
    ".MuiTypography-root": {
      fontSize: "14px",
      fontFamily: "DM Sans",
      color: "var(--black)",
    },
    // ".MuiCheckbox-root": {
    //   display: "inline-block",
    // },
  },
};

const FormCheckbox = ({ name, label, ...rest }: IProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...others } }) => (
        <>
          <FormControlLabel
            sx={style.container}
            control={<Checkbox checked={value} {...others} />}
            label={label}
            {...rest}
          />
          <FormError name={name} />
        </>
      )}
    />
  );
};

export default FormCheckbox;
