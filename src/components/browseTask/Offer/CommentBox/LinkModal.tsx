import FormButton from "@/components/forms/FormButton";
import FormInput from "@/components/forms/FormInput";
import CustomModal from "@/components/reusables/CustomModal";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

interface LinkModalProps {
  open: boolean;
  onCancel: () => void;
  editor: any;
}

const LinkModal = ({ open, onCancel, editor }: LinkModalProps) => {
  const methods = useForm({
    defaultValues: {
      linkUrl: "",
      linkText: "",
    },
    resolver: zodResolver(
      z.object({
        linkUrl: z.string().url("Please enter a valid URL").optional(),
        linkText: z.string().optional(),
      })
    ),
  });

  const onInsert = methods.handleSubmit((values: any) => {
    const { linkUrl, linkText } = values;
    if (!editor || !linkUrl.trim()) return;

    const url = linkUrl.trim();
    const text = linkText.trim() || url;

    editor
      .chain()
      .focus()
      .insertContent({
        type: "text",
        text,
        marks: [
          {
            type: "link",
            attrs: {
              href: url,
              target: "_blank",
              rel: "noopener noreferrer",
            },
          },
        ],
      })
      .run();
    onCancel();
    methods.reset();
  });
  return (
    <CustomModal
      isOpen={open}
      onClose={onCancel}
      className="absolute bottom-[60px] left-0 z-50 bg-white border rounded-md p-4 shadow-md w-[300px]"
    >
      <FormProvider {...methods}>
        <form className="flex flex-col gap-4">
          <FormInput name="linkUrl" label="Link" placeholder="example.com" />
          <FormInput
            name="linkText"
            label="Text"
            placeholder="Display text (optional)"
          />
          <div className="flex justify-end gap-2 mt-2">
            <FormButton
              type="button"
              onClick={onCancel}
              size="lg"
              variant="outline"
            >
              Cancel
            </FormButton>
            <FormButton
              type="button"
              size="lg"
              variant="default"
              onClick={onInsert}
            >
              Insert
            </FormButton>
          </div>
        </form>
      </FormProvider>
    </CustomModal>
  );
};

export default LinkModal;
