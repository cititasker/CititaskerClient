import { FormLabel, Radio, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IProps {
  name: string;
  value: string;
  children?: React.ReactNode;
  label?: string;
  multiple?: boolean;
  showRadio?: boolean;
}

const style: Record<string, SxProps<Theme>> = {
  container: {
    height: "120px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid var(--dark-grey-1)",
    borderRadius: "20px",
    position: "relative",
    cursor: "pointer",

    ".MuiRadio-root": {
      position: "absolute",
      top: 0,
      right: 0,
    },
    ".label_text": {
      color: "var(--black)",
      fontFamily: "Museo Sans",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "normal",
    },
  },
};

const SelectLabel = ({
  name,
  value,
  children,
  label,
  multiple,
  showRadio = true,
}: IProps) => {
  const { control, getValues, setValue, watch } = useFormContext();

  const handleChange = () => {
    if (multiple) {
      const valu = [...getValues(name)];
      if (valu.includes(value)) {
        const index = valu.findIndex((el) => el === value);
        valu.splice(index, 1);
      } else {
        valu.push(value);
      }
      setValue(name, valu);
    } else {
      setValue(name, value);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormLabel
          component="label"
          htmlFor={value}
          sx={style.container}
          className={`${
            multiple
              ? field.value.includes(value)
              : field.value == value && "border border-primary"
          }`}
        >
          <Radio
            id={value}
            checked={
              multiple ? field.value.includes(value) : field.value == value
            }
            onChange={() => {
              if (!multiple) {
                field.onChange(value);
              }
            }}
            onClick={handleChange}
            inputProps={{ "aria-label": label }}
            className={`${!showRadio && "opacity-0"}`}
          />

          {label ? (
            <Typography className="label_text">{label}</Typography>
          ) : (
            children
          )}
        </FormLabel>
      )}
    />
  );
};

export default SelectLabel;
