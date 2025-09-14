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
  rows?: number;
  disabled?: boolean;
  readOnly?: boolean;
}

export default function FormTextArea({
  name,
  label,
  placeholder,
  required = false,
  className,
  maxLength,
  rows = 4,
  disabled = false,
  readOnly = false,
}: FormTextAreaProps) {
  const { control, formState } = useFormContext();
  const error = formState.errors[name];

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn("space-y-2", className)}>
          {label && (
            <FormLabel
              htmlFor={name}
              className="text-sm font-medium text-text-primary"
            >
              {label}
              {required && <span className="text-error ml-1">*</span>}
            </FormLabel>
          )}

          <div className="relative group">
            <Textarea
              id={name}
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              maxLength={maxLength}
              rows={rows}
              aria-invalid={!!error}
              className={cn(
                // Base styles
                "px-4 py-3 rounded-xl resize-none transition-all duration-200",
                "bg-background text-text-primary placeholder:text-text-muted",

                // Border states
                error && "border-error focus:border-error",

                // State styles
                disabled &&
                  "opacity-50 cursor-not-allowed bg-background-secondary",
                readOnly && "bg-background-secondary cursor-default",

                // Minimum height
                rows <= 3 && "min-h-[100px]",
                rows > 3 && "min-h-[120px]"
              )}
            />

            {/* Character count */}
            {maxLength && (
              <div className="absolute bottom-2 right-3 text-xs text-text-muted">
                {field.value?.length || 0}/{maxLength}
              </div>
            )}
          </div>

          <FormMessage className="text-error text-sm" />
        </FormItem>
      )}
    />
  );
}
