import FormButton from "@/components/forms/FormButton";
import FormInput from "@/components/forms/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    min: z.number().min(0, "Min must be ≥ 0"),
    max: z.number().max(100000000, "Max must be ≤ 100"),
  })
  .refine((data) => data.max >= data.min, {
    message: "Max must be greater than or equal to Min",
    path: ["max"],
  });

type RangeForm = z.infer<typeof schema>;

export default function PriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const method = useForm<RangeForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      min: 0,
      max: 80,
    },
  });

  const { setValue, watch, handleSubmit, reset } = method;

  const min = watch("min");
  const max = watch("max");

  useEffect(() => {
    const min = searchParams.get("min");
    const max = searchParams.get("max");

    if (min) {
      setValue("min", Number(min));
    }
    if (max) {
      setValue("max", Number(max));
    }
  }, []);

  // Sync slider to input values
  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      const [newMin, newMax] = value;
      setValue("min", newMin, { shouldValidate: true });
      setValue("max", newMax, { shouldValidate: true });
    }
  };

  const onSubmit = (data: RangeForm) => {
    console.log("Submitted:", data);
    const current = new URLSearchParams(searchParams.toString());

    current.set("min", String(data.min));
    current.set("max", String(data.max));

    router.push(`?${current.toString()}`);
  };

  const handleReset = () => {
    reset();
    const current = new URLSearchParams(searchParams.toString());
    current.delete("min");
    current.delete("max");
    router.push(`?${current.toString()}`);
  };

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="px-3 mt-2">
          <Slider
            range
            min={0}
            max={100000000}
            step={1000}
            value={[min, max]}
            onChange={handleSliderChange}
            allowCross={false}
            className="custom-slider"
            styles={{
              track: { background: "var(--primary)", height: 5 },
              handle: {
                width: 18,
                height: 18,
                top: 3,
                borderColor: "var(--primary)",
                background: "var(--primary)",
                opacity: 1,
              },
              rail: { height: 5 },
            }}
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <label htmlFor="min" className="text-sm font-medium">
              Min
            </label>
            <FormInput name="min" inputClassName="rounded-sm h-10" />
          </div>
          <Minus />
          <div className="flex flex-col">
            <label htmlFor="min" className="text-sm font-medium">
              Max
            </label>
            <FormInput name="max" inputClassName="rounded-sm h-10" />
          </div>
        </div>
        <div className="flex gap-3 ml-auto w-fit">
          <FormButton
            variant="nude"
            text="Apply"
            size="lg"
            className="font-medium text-primary p-0 h-fit"
            type="submit"
          />
          <FormButton
            variant="destructive"
            text="Clear"
            size="lg"
            className="font-medium text-destructive bg-transparent p-0 h-fit"
            onClick={handleReset}
          />
        </div>
      </form>
    </FormProvider>
  );
}
