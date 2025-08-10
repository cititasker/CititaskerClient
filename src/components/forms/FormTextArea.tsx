import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

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
      render={({ field, fieldState }) => (
        <FormItem>
          <div className="space-y-1.5">
            {label && (
              <FormLabel htmlFor={name}>
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </FormLabel>
            )}
            <FormControl>
              <Textarea
                id={name}
                placeholder={placeholder}
                aria-invalid={!!fieldState.error}
                className={cn(
                  "min-h-[120px] rounded sm:rounded-lg md:rounded-xl",
                  fieldState.error && "border-destructive",
                  className
                )}
                maxLength={maxLength}
                {...field}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
