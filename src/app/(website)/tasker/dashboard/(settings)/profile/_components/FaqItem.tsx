import FormButton from "@/components/forms/FormButton";
import FormInput from "@/components/forms/FormInput";
import FormTextArea from "@/components/forms/FormTextArea";
import { Trash } from "lucide-react";
import React from "react";

interface IProps {
  index?: number;
  question: string;
  answer: string;
  removeFaq?: (index: number) => void;
}

export default function FaqItem({
  index,
  question,
  answer,
  removeFaq,
}: IProps) {
  return (
    <div>
      <div className="space-y-4">
        <FormInput label="FAQ" name={question} inputClassName="rounded-[9px]" />
        <FormTextArea label="Answer" name={answer} className="rounded-[9px]" />
      </div>
      {index && index > 0 && removeFaq ? (
        <FormButton
          icon={<Trash />}
          text="Delete"
          variant="nude"
          className="text-destructive text-sm h-fit p-1 ml-auto mt-1"
          onClick={() => removeFaq(index)}
        />
      ) : null}
    </div>
  );
}
