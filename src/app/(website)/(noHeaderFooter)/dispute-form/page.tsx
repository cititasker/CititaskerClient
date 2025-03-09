"use client";
import FormSelect from "@/components/forms/FormSelect";
import Icons from "@/components/Icons";
import { disputeSchema, disputeSchemaType } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import FormTextArea from "@/components/forms/FormTextArea";
import FormButton from "@/components/forms/FormButton";

export default function Page() {
  const methods = useForm<disputeSchemaType>({
    defaultValues: {
      task_status: "",
      reason: "",
      proposal: "",
      refund_amount: "",
      detail: "",
      files: [],
    },
    resolver: zodResolver(disputeSchema),
  });
  const { handleSubmit } = methods;

  const handleUpload = (e: any) => {
    const files = e.target.files;
    console.log(files);
  };

  const onSubmit = (values: disputeSchemaType) => {
    console.log(values);
  };
  return (
    <div className="container">
      <Link
        href="/my-tasks"
        className="text-primary  py-6 text-[16px] underline font-bold flex gap-2 items-center"
      >
        <Icons.arrowLeft />
        Back to citiTasker
      </Link>
      <div className="max-w-[716px] mx-auto py-10 overflow-y-auto h-[calc(100dvh-72px)] hide-scrollbar">
        <Typography className="text-center text-2xl text-[#000] font-semibold mb-10">
          Dispute Form
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2.5 w-full"
          >
            <FormSelect name="task_status" label="Task Status" options={[]} />
            <FormSelect name="reason" label="Select Reason" options={[]} />
            <Grid container columnSpacing="30px" rowSpacing="10px">
              <Grid size={{ xs: 12, md: 6 }}>
                <FormSelect
                  name="proposal"
                  label="Your Proposal"
                  options={[]}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormSelect
                  name="refund_amount"
                  label="Refund Amount"
                  options={[]}
                  placeholder="Enter Amount"
                />
              </Grid>
            </Grid>
            <FormTextArea
              name="detail"
              label="Detail"
              placeholder="Please provide detail information about the dispute"
            />
            <label
              htmlFor="upload"
              className="p-4 w-full min-h-[160px] rounded-20 border-2 border-dashed border-dark-grey-1 flex flex-col items-center justify-center"
            >
              <input
                type="file"
                name="files"
                id="upload"
                accept=".jpeg,.jpg,.png"
                hidden
                onChange={handleUpload}
              />
              <div className="flex flex-col items-center justify-center max-w-[370px]">
                <Icons.upload />
                <Typography className="text-center text-sm text-primary mt-2.5">
                  Click to upload document
                </Typography>
                <Typography className="text-xs text-black-2 mt-4 text-center">
                  Please ensure your file meets the following requirements: JPEG
                  (.jpg, .jpeg) PNG (.png) and file size not more than 5mb.
                </Typography>
              </div>
            </label>
            <FormButton type="submit" btnStyle="w-full mt-8" text="Submit" />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
