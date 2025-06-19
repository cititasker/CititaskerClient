import React, { useState } from "react";
import FormButton from "@/components/forms/FormButton";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormSchema } from "../../_utils/schema";
import FormError from "@/components/reusables/FormError";

const SkillsSection = () => {
  const [text, setText] = useState("");
  const { control } = useFormContext<FormSchema>();

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: "skills",
  });

  const handleAdd = () => {
    if (text.trim()) {
      appendSkill({ name: text });
      setText("");
    }
  };

  return (
    <div className="px-5 sm:px-[47px] pb-6 border-b-[0.5px] border-[#EBEBEB]">
      <div className="max-w-[653px]">
        <label className="text-sm font-semibold mb-1.5 text-black-2">
          Skills
        </label>
        <>
          <div className=" relative mb-2">
            <Input
              type="text"
              value={text}
              className="text-sm rounded-md bg-light-grey pl-4 pr-[90px]"
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAdd();
                }
              }}
            />
            <FormButton
              type="button"
              variant="nude"
              className="bg-white text-primary absolute right-2 top-0 bottom-0 my-auto"
              handleClick={handleAdd}
              disabled={!text}
              size="sm"
            >
              Add
            </FormButton>
          </div>
          <FormError name="skills" />
        </>

        {skillFields.length > 0 && (
          <div className="border p-3 rounded-lg flex flex-wrap gap-2 bg-[#f3f5f6]">
            {skillFields.map((field, index) => (
              <Badge
                key={field.id}
                variant="default"
                className="bg-white capitalize hover:bg-primary/5 cursor-pointer text-black-2 px-4 py-2 text-sm rounded-full flex items-center gap-2"
              >
                {field.name}
                <button type="button" onClick={() => removeSkill(index)}>
                  ✕
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;
