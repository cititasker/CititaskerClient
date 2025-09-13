"use client";

import React from "react";
import Link from "next/link";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { disputeSchema, disputeSchemaType } from "@/schema";
import Icons from "@/components/Icons";
import FormSelect from "@/components/forms/FormSelect";
import FormTextArea from "@/components/forms/FormTextArea";
import FormButton from "@/components/forms/FormButton";

export default function DisputeFormPage() {
  const methods = useForm<disputeSchemaType>({
    resolver: zodResolver(disputeSchema),
    defaultValues: {
      task_status: "",
      reason: "",
      proposal: "",
      refund_amount: "",
      detail: "",
      files: [],
    },
  });

  const { handleSubmit, setValue } = methods;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      setValue("files", Array.from(files));
    }
  };

  const onSubmit = (data: disputeSchemaType) => {
    console.log("Dispute form submitted:", data);
  };

  return (
    <div className="container-w">
      <Link
        href="/my-tasks"
        className="text-primary py-6 text-[16px] underline font-bold flex gap-2 items-center"
      >
        <Icons.arrowLeft />
        Back to citiTasker
      </Link>

      <div className="max-w-[716px] mx-auto py-10 overflow-y-auto h-[calc(100dvh-72px)] hide-scrollbar">
        <h2 className="text-center text-2xl text-black font-semibold mb-10">
          Dispute Form
        </h2>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full"
          >
            {/* Select Fields */}
            <FormSelect name="task_status" label="Task Status" options={[]} />
            <FormSelect name="reason" label="Select Reason" options={[]} />

            {/* Two Column Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormSelect name="proposal" label="Your Proposal" options={[]} />
              <FormSelect
                name="refund_amount"
                label="Refund Amount"
                options={[]}
                placeholder="Enter Amount"
              />
            </div>

            {/* Textarea */}
            <FormTextArea
              name="detail"
              label="Detail"
              placeholder="Please provide detail information about the dispute"
            />

            {/* Upload Area */}
            <label
              htmlFor="upload"
              className="p-4 w-full min-h-[160px] rounded-20 border-2 border-dashed border-dark-grey-1 flex flex-col items-center justify-center"
            >
              <input
                type="file"
                id="upload"
                accept=".jpeg,.jpg,.png"
                hidden
                onChange={handleUpload}
              />
              <div className="flex flex-col items-center justify-center max-w-[370px]">
                <Icons.upload />
                <p className="text-center text-sm text-primary mt-2.5">
                  Click to upload document
                </p>
                <p className="text-xs text-black-2 mt-4 text-center">
                  Please ensure your file meets the following requirements: JPEG
                  (.jpg, .jpeg), PNG (.png) and file size not more than 5mb.
                </p>
              </div>
            </label>

            <FormButton type="submit" className="w-full mt-8" text="Submit" />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
