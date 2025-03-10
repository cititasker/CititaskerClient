"use client";
import React, { useState } from "react";
import FormButton from "../forms/FormButton";
import FormTextEditor from "../reusables/FormTextEditor";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormError from "../reusables/FormError";

const schema = z.object({
  bio: z.string().min(1, { message: "Please enter some text" }),
});
type schemaType = z.infer<typeof schema>;
const PersonalDetails = () => {
  const [edit, setEdit] = useState(false);

  const methods = useForm<schemaType>({
    defaultValues: {
      bio: "",
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, control, watch } = methods;

  const bio = watch("bio");

  const toggleEdit = () => {
    setEdit((prev) => !prev);
  };
  const onSubmit = (values: schemaType) => {
    console.log(values);
    toggleEdit();
  };
  return (
    <div className="px-10">
      {!edit && (
        <FormButton
          text="Edit personal details"
          btnStyle="min-w-[148px] ml-auto mb-5"
          handleClick={toggleEdit}
        />
      )}
      {edit ? (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="bio"
              render={({ field }) => (
                <div>
                  <FormTextEditor
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                  <FormError name="bio" />
                </div>
              )}
            />
            <FormButton
              type="submit"
              text="Save"
              btnStyle="mt-5 max-w-[180px] w-full"
            />
          </form>
        </FormProvider>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: bio }} />
      )}
    </div>
  );
};

export default PersonalDetails;
