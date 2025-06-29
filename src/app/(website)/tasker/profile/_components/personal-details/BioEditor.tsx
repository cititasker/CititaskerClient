import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import FormTextEditor from "@/components/reusables/FormTextEditor";
import FormError from "@/components/reusables/FormError";

const BioEditor = () => {
  const { control } = useFormContext();
  return (
    <div className="pb-6 border-b-[0.5px] border-[#EBEBEB]">
      <div className="max-w-[653px]">
        <label className="text-sm font-semibold mb-1.5 text-black-2">
          About me
        </label>
        <Controller
          name="bio"
          control={control}
          render={({ field }) => (
            <>
              <FormTextEditor value={field.value} onChange={field.onChange} />
              <FormError name="bio" />
            </>
          )}
        />
      </div>
    </div>
  );
};

export default BioEditor;
