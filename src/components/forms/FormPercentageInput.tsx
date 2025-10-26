import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Percent } from "lucide-react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useEffect, useState, ReactNode } from "react";

type PercentageInputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  mode?: "fraction" | "percent";
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  icon?: ReactNode;
};

export function PercentageInput<T extends FieldValues>({
  name,
  label,
  mode = "fraction",
  className,
  placeholder = mode === "percent" ? "50" : "0.5",
  disabled,
  icon,
}: PercentageInputProps<T>) {
  const { control } = useFormContext();
  const min = mode === "percent" ? 1 : 0;
  const max = mode === "percent" ? 100 : 1;

  const leadingIcon = icon ?? (
    <Percent size={16} className="text-muted-foreground" />
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const [localValue, setLocalValue] = useState<string>(() => {
          if (typeof field.value === "number") {
            return String(field.value);
          }
          return "";
        });

        const [isFocused, setIsFocused] = useState(false);

        useEffect(() => {
          if (!isFocused && typeof field.value === "number") {
            const value = field.value;
            if (Number(value).toFixed(4) !== Number(localValue).toFixed(4)) {
              setLocalValue(String(value));
            }
          }
        }, [field.value, isFocused]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const raw = e.target.value;
          setLocalValue(raw);

          const parsed = parseFloat(raw);

          if (!raw || isNaN(parsed)) {
            field.onChange(undefined);
            return;
          }

          let value: number;

          if (mode === "percent") {
            // If user types a fraction (e.g., 0.2), convert to percent (20)
            if (parsed <= 1) {
              value = parsed * 100;
            } else {
              value = parsed;
            }
          } else {
            // mode === 'fraction'
            // If user types a percent (e.g., 20), convert to fraction (0.2)
            if (parsed > 1) {
              value = parsed / 100;
            } else {
              value = parsed;
            }
          }

          // Clamp value to valid range
          const actualMin = min;
          const actualMax = max;
          value = Math.min(Math.max(value, actualMin), actualMax);

          field.onChange(value);
        };

        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <div className="relative w-full">
                <span className="absolute top-1/2 left-3 -translate-y-1/2">
                  {leadingIcon}
                </span>
                <Input
                  type="number"
                  inputMode="decimal"
                  step="any"
                  min={min}
                  max={max}
                  placeholder={placeholder}
                  disabled={disabled}
                  aria-invalid={!!fieldState.error}
                  className={cn(
                    "transition-all duration-200",
                    "bg-background text-text-primary placeholder:text-text-muted w-full",
                    fieldState.error && "border-error focus:border-error",
                    leadingIcon ? "pl-10" : "",
                    className
                  )}
                  value={localValue}
                  onChange={handleChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
