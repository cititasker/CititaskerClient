"use client";

import React from "react";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as ShadSelect,
} from "../ui/select";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export type TOption = {
  label: string;
  value: string;
  [key: string]: any;
};

const selectVariants = cva(
  "relative cursor-text flex items-center justify-start gap-2 w-full border border-input rounded-md bg-transparent px-3 py-1 transition-colors whitespace-nowrap text-base disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "text-primary-foreground hover:bg-primary/90",
        destructive: "text-destructive-foreground hover:bg-destructive/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-3 lg:px-4",
        md: "h-10 rounded-md px-3 text-sm",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-3 lg:px-4",
      },
    },
    defaultVariants: {
      // variant: "default",
      size: "default",
    },
  }
);

export interface SelectProps
  extends Omit<React.InputHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectVariants> {
  leftComp?: React.ReactNode;
  containerClassName?: string;
  size?: "default" | "sm" | "lg" | "md";
  options?: TOption[];
  isLoading?: boolean;
  label?: React.ReactNode;
  contentPosition?: "top" | "bottom" | "left" | "right";
  onValueChange?: (
    value: string,
    selectedOption: TOption,
    options: TOption[]
  ) => void;
}

const Select = React.forwardRef<unknown, SelectProps>(
  ({
    variant,
    size,
    // className,
    leftComp,
    value,
    label,
    isLoading,
    contentPosition = "bottom",
    // onSelect,
    containerClassName,
    // onChange,
    options,
    required,
    onValueChange = () => {},
    ...props
  }) =>
    // ref
    {
      return (
        <ShadSelect
          open={props.disabled ? false : undefined}
          value={value as string}
          onValueChange={(value) => {
            onValueChange(
              value,
              options?.find((opt) => opt.value === value) || ({} as TOption),
              options || []
            );
          }}
        >
          <SelectTrigger
            className={cn(
              selectVariants({ variant, size, className: containerClassName }),
              label && value && "pt-6 font-medium"
            )}
          >
            <div className="flex-1 flex items-center gap-2">
              {isLoading ? (
                <LoaderCircle className="animate-spin duration-200" />
              ) : (
                leftComp
              )}
              {label && (
                <label
                  htmlFor={props.name}
                  className={cn(
                    "duration-300 text-muted-foreground font-medium",
                    value ? "absolute top-[2px] text-sm" : "text-base"
                  )}
                >
                  {label}{" "}
                  <span className="text-red-600">{required ? "*" : null}</span>
                </label>
              )}
              {value && (
                <SelectValue
                  placeholder="Select a fruit"
                  className="font-medium"
                />
              )}
            </div>
          </SelectTrigger>
          <SelectContent className="" side={contentPosition}>
            {options?.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </ShadSelect>
      );
    }
);

Select.displayName = "Select";
export { Select };
