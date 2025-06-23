"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/ui/form";

interface FormSwitchProps {
  label?: string;
  name?: string;
  control?: any;
  value?: boolean;
  handleChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export default function FormSwitch({
  label,
  name = "",
  control,
  value = false,
  handleChange,
  disabled = false,
}: FormSwitchProps) {
  const renderSwitch = (
    checked: boolean,
    onChange: (checked: boolean) => void
  ) => (
    <div className="flex items-center space-x-2">
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        className="data-[state=checked]:bg-[#34C759]"
      />
      {label && <Label htmlFor={name}>{label}</Label>}
    </div>
  );

  if (control) {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => renderSwitch(field.value, field.onChange)}
      />
    );
  }

  return renderSwitch(value, handleChange || (() => {}));
}
