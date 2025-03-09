"use client";
import React from "react";
import { PinInput } from "react-input-pin-code";

interface IProps {
  handleChange: any;
  values: string[];
}
const CustomPinInput = ({ handleChange, values }: IProps) => {
  return (
    <PinInput
      values={values}
      size="lg"
      placeholder="*"
      // autoFocus
      containerClassName="!mx-auto !w-fit !gap-[2.5rem]"
      inputClassName="!rounded-full !mr-0 placeholder:!text-[20px] relative placeholder:absolute placeholder:left-[50%] top-[50%] placeholder:-translate-x-[50%] placeholder:translate-y-[8%]"
      onChange={handleChange}
    />
  );
};

export default CustomPinInput;
