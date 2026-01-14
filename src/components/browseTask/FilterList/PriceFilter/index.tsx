import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Minus } from "lucide-react";
import { usePriceRange } from "./hooks/usePriceRange";
import { RangeSlider } from "@/components/forms/RangeSlider";
import { PriceInput } from "./PriceInput";
import { ActionButtons } from "../ActionButtons";

const PRICE_RANGE = {
  min: 0,
  max: 10000000,
  step: 1000,
  defaultMax: 10000000,
};

const schema = z
  .object({
    min: z
      .number()
      .min(
        PRICE_RANGE.min,
        `Min must be ≥ ₦${PRICE_RANGE.min.toLocaleString()}`
      ),
    max: z
      .number()
      .max(
        PRICE_RANGE.max,
        `Max must be ≤ ₦${PRICE_RANGE.max.toLocaleString()}`
      ),
  })
  .refine((data) => data.max >= data.min, {
    message: "Maximum must be greater than or equal to minimum",
    path: ["max"],
  });

type PriceForm = z.infer<typeof schema>;

export default function PriceFilter() {
  const form = useForm<PriceForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      min: PRICE_RANGE.min,
      max: PRICE_RANGE.defaultMax,
    },
  });

  const { setValue, watch, handleSubmit, reset } = form;
  const { updateUrl, clearUrl } = usePriceRange({ form });

  const min = watch("min");
  const max = watch("max");
  const hasValues = min > PRICE_RANGE.min || max < PRICE_RANGE.defaultMax;

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      const [newMin, newMax] = value;
      setValue("min", newMin, { shouldValidate: true });
      setValue("max", newMax, { shouldValidate: true });
    }
  };

  const onSubmit = (data: PriceForm) => {
    updateUrl(data);
  };

  const handleReset = () => {
    reset({
      min: PRICE_RANGE.min,
      max: PRICE_RANGE.defaultMax,
    });
    clearUrl();
  };

  return (
    <div className="bg-white md:rounded-xl md:shadow-sm md:border border-gray-100 md:p-4">
      <div className="mb-3 md:mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Price Range
        </h3>
        <p className="text-sm text-gray-500">Set your budget range for tasks</p>
      </div>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Slider Section */}
          <RangeSlider
            name="range"
            range
            min={0}
            max={10000000}
            step={1000}
            unit="₦"
            showTooltip={false}
            defaultValue={[min, max]}
            value={[min, max]}
            onChange={handleSliderChange}
          />

          {/* Input Section */}
          <div className="flex items-start gap-2 md:gap-3">
            <PriceInput name="min" label="Minimum" value={min} />

            <div className="flex items-center pt-8">
              <Minus className="text-gray-400" size={20} />
            </div>

            <PriceInput name="max" label="Maximum" value={max} />
          </div>

          {/* Action Buttons */}
          <ActionButtons onReset={handleReset} hasValues={hasValues} />
        </form>
      </FormProvider>
    </div>
  );
}
