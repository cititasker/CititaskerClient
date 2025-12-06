"use client";

import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";

export const LazyNumericFormat = dynamic(
  () => import("react-number-format").then((mod) => mod.NumericFormat),
  {
    ssr: false,
    loading: () => (
      <Input
        disabled
        placeholder="Loading..."
        className="text-3xl font-semibold text-center bg-transparent outline-none w-full"
      />
    ),
  }
);
