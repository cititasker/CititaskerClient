"use client";
import React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import FormInput from "./FormInput";

interface CurrencyInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  containerStyle?: any;
  [key: string]: any;
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        prefix="₦ "
      />
    );
  }
);

const CurrencyInput = ({
  name,
  label,
  placeholder,
  containerStyle,
  ...rest
}: CurrencyInputProps) => {
  return (
    <FormInput
      variant="outlined"
      name={name}
      label={label}
      placeholder={placeholder}
      InputProps={{
        inputComponent: NumericFormatCustom as any,
        sx: { "& .MuiOutlinedInput-input": { px: "20px" } },
      }}
      wrapperStyle={containerStyle}
      {...rest}
    />
  );
};

export default CurrencyInput;
