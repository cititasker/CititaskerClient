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

  const keys = name.split(".");
  let errorMessage: string | undefined;

  if (keys.length === 2) {
    const parentError = errors?.[keys[0]];
    if (typeof parentError === "object" && parentError !== null) {
      errorMessage = (parentError as Record<string, any>)?.[keys[1]]?.message;
    }
  } else {
    errorMessage = (errors[name] as any)?.message;
  }

  if (!errorMessage) return null;

  return (
    <p className={cn("text-xs text-destructive font-medium mt-1", className)}>
      {errorMessage}
    </p>
  );
};

export default FormError;
