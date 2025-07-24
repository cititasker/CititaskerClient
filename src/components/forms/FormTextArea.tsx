// components/form/form-textarea.tsx

import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

interface FormTextAreaProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  maxLength?: number;
}

export default function FormTextArea({
  name,
  label,
  placeholder,
  required,
  className,
  maxLength,
}: FormTextAreaProps) {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <div className="space-y-1.5">
            {label && (
              <FormLabel htmlFor={name}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </FormLabel>
            )}
            <Textarea
              id={name}
              placeholder={placeholder}
              className={cn(
                "min-h-[120px] rounded sm:rounded-lg md:rounded-xl",
                className
              )}
              maxLength={maxLength}
              {...field}
            />
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
