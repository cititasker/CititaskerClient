"use client";
import React, { useEffect, useState } from "react";
import { IState, State } from "country-state-city";
import FormAutoComplete from "./FormAutoComplete";

interface IProps {
  countryCode?: string;
  name: string;
  label?: string;
}

interface IIState {
  id: string;
  name: string;
}

const SelectState = ({ name, label, countryCode = "NG" }: IProps) => {
  const [states, setStates] = useState<IIState[]>([]);

  useEffect(() => {
    const allStates = State.getStatesOfCountry(countryCode) as IState[];
    const index = allStates.findIndex((el) => el.name == "Lagos");
    const [lagos] = allStates.splice(index, 1);
    allStates.splice(0, 0, lagos);
    setStates(allStates.map((el) => ({ id: el.isoCode, name: el.name })));
  }, []);
  return (
    <>
      <FormAutoComplete
        label={label}
        options={states}
        getOptionLabel={(option: any) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        name={name}
        disabled={!countryCode}
        placeholder="Select a state"
      />
    </>
  );
};

export default SelectState;
