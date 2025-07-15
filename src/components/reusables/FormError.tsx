import React from "react";
import { useFormContext } from "react-hook-form";

const FormError = ({ name }: { name: string }) => {
  const {
    formState: { errors },
  } = useFormContext();

  if (errors.hasOwnProperty(name))
    return (
      <p className="text-xs text-destructive font-medium mt-1">
        {errors[name]?.message as any}
      </p>
    );
  else return null;
};

export default FormError;
