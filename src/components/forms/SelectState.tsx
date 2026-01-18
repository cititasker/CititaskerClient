"use client";
import { useMemo } from "react";
import { FormAutoComplete } from "@/components/forms/FormAutoComplete";
import { NIGERIA_STATES } from "@/lib/utils/nigeria-states";

interface SelectStateProps {
  name: string;
  label?: string;
  countryCode?: string; // Keep for API compatibility, but we'll ignore it since we only have NG data
}

interface StateOption {
  id: string;
  name: string;
}

const SelectState = ({
  name,
  label = "State",
  countryCode = "NG",
}: SelectStateProps) => {
  const states = useMemo<StateOption[]>(() => {
    // Reorder to put Lagos first, then alphabetically sort the rest
    const lagosState = NIGERIA_STATES.find((s) => s.name === "Lagos");
    const otherStates = NIGERIA_STATES.filter((s) => s.name !== "Lagos");

    const reordered = lagosState ? [lagosState, ...otherStates] : otherStates;

    return reordered.map((s) => ({
      id: s.isoCode,
      name: s.name,
    }));
  }, [countryCode]); // Keep countryCode in deps for future-proofing

  return (
    <FormAutoComplete
      name={name}
      label={label}
      options={states}
      getOptionLabel={(opt) => opt.name}
      isOptionEqualToValue={(a, b) => a?.id === b?.id}
      placeholder="Select a state"
    />
  );
};

export default SelectState;
