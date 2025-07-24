import { cn } from "@/lib/utils";
import React from "react";
import { useFormContext } from "react-hook-form";

const FormError = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  if (errors.hasOwnProperty(name))
    return (
      <p className={cn("text-xs text-destructive font-medium mt-1", className)}>
        {errors[name]?.message as any}
      </p>
    );
  else return null;
};

export default FormError;
