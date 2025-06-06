// components/form/form-textarea.tsx

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useFormContext, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import FormError from "./FormError";

interface FormTextAreaProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function FormTextArea({
  name,
  label,
  placeholder,
  required,
  className,
}: FormTextAreaProps) {
  const { control } = useFormContext();

  return (
    <div className="space-y-1.5">
      {label && (
        <Label htmlFor={name}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Textarea
            id={name}
            placeholder={placeholder}
            className={cn("min-h-[120px] rounded-[25px]", className)}
            {...field}
          />
        )}
      />

      <FormError name={name} />
    </div>
  );
}
