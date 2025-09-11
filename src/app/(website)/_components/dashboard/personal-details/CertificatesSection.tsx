import React from "react";
import FormButton from "@/components/forms/FormButton";
import { useFieldArray, useFormContext } from "react-hook-form";
import FormInput from "@/components/forms/FormInput";
import { Plus, Trash2 } from "lucide-react";
import FormDatePicker from "@/components/forms/FormDatePicker";
import { FormSchema } from "../schema";

const CertificatesSection = () => {
  const { control } = useFormContext<FormSchema>();

  const {
    fields: certFields,
    append: appendCert,
    remove: removeCert,
  } = useFieldArray({
    control,
    name: "certificates",
  });

  return (
    <div className="pb-6 border-b-[0.5px] border-[#EBEBEB]">
      <div className="max-w-[653px] space-y-4">
        <label className="text-sm font-semibold mb-1.5 text-black-2">
          Certifications
        </label>
        <div className="space-y-3 w-full">
          {certFields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start w-full">
              <img
                src="/images/Certificate.svg"
                alt="certificate"
                width={60}
                height={60}
              />
              <div className="w-full flex gap-2 flex-col">
                <div className="flex-1 space-y-2 w-full">
                  <FormInput
                    name={`certificates[${index}].institution`}
                    label="Awarded by:"
                    inputClassName="rounded-md bg-light-grey"
                  />
                  <FormDatePicker
                    name={`certificates[${index}].year`}
                    label="Year:"
                  />
                </div>
                <FormButton
                  type="button"
                  onClick={() => removeCert(index)}
                  variant="nude"
                  text="Remove"
                  className="text-red-state-color px-0 text-sm w-fit"
                  icon={<Trash2 />}
                  size="sm"
                />
              </div>
            </div>
          ))}
        </div>
        <FormButton
          type="button"
          onClick={() => appendCert({ institution: "", year: "" })}
          variant="nude"
          icon={<Plus />}
          className="text-primary mt-7 px-0 text-sm font-medium"
        >
          Add Certificate
        </FormButton>
      </div>
    </div>
  );
};

export default CertificatesSection;
