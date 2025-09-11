import React, { useState } from "react";
import Slider, { SliderProps } from "rc-slider";
import Tooltip from "rc-tooltip";
import { Controller, useFormContext } from "react-hook-form";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

type SingleOrRange = number | number[];

interface RangeSliderProps {
  name: string;
  min: number;
  max: number;
  step?: number;
  defaultValue?: SingleOrRange;
  range?: boolean;
  showTooltip?: boolean;
  unit?: string;
  formatter?: (value: number) => string;
  disabled?: boolean;
  allowCross?: boolean;
  customStyles?: Partial<SliderProps["styles"]>;
  value?: number | number[];
  onChange?: (value: SingleOrRange) => void;
}

export function RangeSlider({
  name,
  min,
  max,
  step = 1,
  range = false,
  showTooltip = true,
  unit = "",
  formatter,
  disabled = false,
  allowCross = false,
  customStyles,
  defaultValue,
  value,
  onChange,
}: RangeSliderProps) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const { control } = useFormContext();

  // Default value formatter (e.g., "50 km")
  const formatValue = (value: number) => {
    return formatter ? formatter(value) : `${value}${unit}`;
  };

  const defaultStyles: SliderProps["styles"] = {
    track: {
      background: "var(--primary)",
      height: 6,
      borderRadius: 3,
    },
    handle: {
      width: 20,
      height: 20,
      top: 4,
      borderColor: "var(--primary)",
      background: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      opacity: 1,
      borderWidth: 3,
    },
    rail: {
      height: 6,
      backgroundColor: "#e5e7eb",
      borderRadius: 3,
    },
  };

  return (
    <div className="px-4 py-2">
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ?? (range ? [min, max] : min)}
        render={({ field }) => (
          <Slider
            {...field}
            range={range}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            allowCross={allowCross}
            styles={{ ...defaultStyles, ...customStyles }}
            value={value ?? field.value}
            onChange={(val) => {
              field.onChange(val);
              onChange?.(val);
            }}
            handleRender={(node, handleProps) => {
              if (!showTooltip) return node;
              return (
                <Tooltip
                  overlay={formatValue(handleProps.value)}
                  placement="bottom"
                  visible={tooltipVisible || handleProps.dragging}
                  key={handleProps.index}
                  overlayInnerStyle={{ zIndex: 10 }}
                >
                  {React.cloneElement(node, {
                    ...node.props,
                    onFocus: () => setTooltipVisible(true),
                    onBlur: () => setTooltipVisible(false),
                    tabIndex: 0,
                  })}
                </Tooltip>
              );
            }}
          />
        )}
      />
    </div>
  );
}
