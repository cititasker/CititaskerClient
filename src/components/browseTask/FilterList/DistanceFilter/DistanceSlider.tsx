import React from "react";

import { RangeSlider } from "@/components/forms/RangeSlider";

interface DistanceSliderProps {
  control: any;
  value: number;
}

export function DistanceSlider({ control, value }: DistanceSliderProps) {
  return (
    <div>
      <p className="mb-2">Distance ({value} km)</p>
      <div>
        <RangeSlider
          name="distance"
          min={0}
          max={100}
          unit=" km"
          defaultValue={10}
        />
      </div>
    </div>
  );
}
