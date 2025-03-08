import {
  FormControl,
  FormLabel,
  SxProps,
  TextField,
  Theme,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import FormError from "../reusables/FormError";

interface IProps {
  label?: string;
  name: string;
  placeholder?: string;
  sx?: any;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  [key: string]: any;
}

const styles: Record<string, SxProps<Theme>> = {
  container: {
    mb: "15px",

    ".MuiFormLabel-root": {
      fontSize: "14px",
      fontWeight: 500,
      textAlign: "left",
      color: "var(--black)",
      mb: "10px",
    },
    ".MuiOutlinedInput-root": {
      borderRadius: "9.75px",
      fontSize: "16px",

      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "1px solid",
        borderColor: "var(--primary)",
      },

      ".MuiOutlinedInput-input::placeholder": {
        color: "var(--dark-grey-2)",
      },
      ".MuiOutlinedInput-notchedOutline": {
        border: "1px solid var(--dark-grey-1)",
      },
      ".MuiOutlinedInput-input": {
        py: 0,
        height: "100%",
        bgcolor: "#fff",
        resize: "both",
      },
    },
    ".required": {
      color: "rgba(217, 63, 33, 1)",
      fontSize: "13.7px",
      fontWeight: "500",
      lineHeight: "20.48px",
      textAlign: "left",
    },
  },
};

const FormTextArea = ({
  label,
  name,
  placeholder,
  sx,
  rows = 4,
  required,
  disabled,
  ...rest
}: IProps) => {
  const { control } = useFormContext();

  return (
    <FormControl fullWidth sx={{ ...styles.container, ...sx }} {...rest}>
      {label && (
        <FormLabel htmlFor={name} className="label">
          {label} {required && <span className="required"> *</span>}
        </FormLabel>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            id={name}
            rows={rows}
            multiline
            placeholder={placeholder}
            disabled={disabled}
            {...field}
          />
        )}
      />
      <FormError name={name} />
    </FormControl>
  );
};

export default FormTextArea;
