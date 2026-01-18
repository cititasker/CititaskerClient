import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UseFormReturn } from "react-hook-form";

interface PriceRange {
  min: number;
  max: number;
}

interface UsePriceRangeProps {
  form: UseFormReturn<PriceRange>;
}

export function usePriceRange({ form }: UsePriceRangeProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setValue } = form;

  // Initialize from URL parameters
  useEffect(() => {
    const min = searchParams.get("min");
    const max = searchParams.get("max");

    if (min) setValue("min", Number(min));
    if (max) setValue("max", Number(max));
  }, [setValue, searchParams]);

  const updateUrl = (data: PriceRange) => {
    const current = new URLSearchParams(searchParams.toString());
    current.set("min", String(data.min));
    current.set("max", String(data.max));
    router.push(`?${current.toString()}`);
  };

  const clearUrl = () => {
    const current = new URLSearchParams(searchParams.toString());
    current.delete("min");
    current.delete("max");
    router.push(`?${current.toString()}`);
  };

  return { updateUrl, clearUrl };
}
