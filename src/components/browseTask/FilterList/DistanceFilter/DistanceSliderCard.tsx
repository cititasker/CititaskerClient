import React from "react";
import { Ruler } from "lucide-react";
import { RangeSlider } from "@/components/forms/RangeSlider";
import { useFormContext } from "react-hook-form";

interface DistanceSliderCardProps {
  value: number;
}

export function DistanceSliderCard({ value }: DistanceSliderCardProps) {
  const { control } = useFormContext();

  const getDistanceLabel = (km: number) => {
    if (km === 0) return "Exact location";
    if (km <= 5) return `${km}km - Very close`;
    if (km <= 15) return `${km}km - Nearby`;
    if (km <= 50) return `${km}km - Same city`;
    return `${km}km - Wide area`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Ruler size={16} />
          Distance Range
        </label>
        <div className="text-right">
          <div className="text-lg font-semibold text-gray-900">{value} km</div>
          <div className="text-xs text-gray-500">{getDistanceLabel(value)}</div>
        </div>
      </div>

      <div className="py-2">
        <RangeSlider
          name="distance"
          min={0}
          max={100}
          unit=" km"
          defaultValue={10}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-400">
        <span>0 km</span>
        <span>100 km</span>
      </div>
    </div>
  );
}
