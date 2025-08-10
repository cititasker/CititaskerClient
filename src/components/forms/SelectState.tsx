"use client";
import { useEffect, useState } from "react";
import { State, IState } from "country-state-city";
import { FormAutoComplete } from "@/components/forms/FormAutoComplete";

interface SelectStateProps {
  name: string;
  label?: string;
  countryCode?: string;
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
  const [states, setStates] = useState<StateOption[]>([]);

  useEffect(() => {
    const allStates = State.getStatesOfCountry(countryCode) as IState[];
    const reordered = [
      ...allStates.filter((s) => s.name === "Lagos"),
      ...allStates.filter((s) => s.name !== "Lagos"),
    ];
    setStates(
      reordered.map((s) => ({
        id: s.isoCode,
        name: s.name,
      }))
    );
  }, [countryCode]);

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
