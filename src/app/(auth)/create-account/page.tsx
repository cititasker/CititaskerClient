"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ROLE } from "@/constant";
import { cn } from "@/utils";
import { createAccountSchema, createAccountSchemaType } from "@/schema/auth";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import FormButton from "@/components/forms/FormButton";
import FadeUp from "@/components/reusables/FadeUp";

const roleOptions = [
  {
    id: ROLE.tasker,
    label: "I want to earn as a Tasker.",
  },
  {
    id: ROLE.poster,
    label: "I want to post tasks on CitiTasker.",
  },
];

const CreateAccountPage = () => {
  const router = useRouter();
  const form = useForm<createAccountSchemaType>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: { role: "" },
  });

  const onSubmit = ({ role }: createAccountSchemaType) => {
    router.push(`/signup?role=${role}`);
  };

  return (
    <FadeUp className="max-w-[466px] mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="text-center space-y-2 mb-10 sm:mb-[3.75rem]">
            <h2 className="text-black-2 text-2xl sm:text-[1.875rem] font-semibold">
              Start your journey on CitiTasker
            </h2>
            <p className="text-dark-grey-2 text-base sm:text-xl">
              Select an option below to get started
            </p>
          </div>

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="mb-8">
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-5"
                >
                  {roleOptions.map(({ id, label }) => (
                    <Label
                      key={id}
                      htmlFor={id}
                      className={cn(
                        "p-4 h-[140px] sm:h-[200px] rounded-[20px] bg-white flex items-center justify-center text-center relative cursor-pointer shadow-sm border transition-colors",
                        field.value === id
                          ? "border-primary"
                          : "border-transparent"
                      )}
                    >
                      <RadioGroupItem
                        id={id}
                        value={id}
                        className="absolute top-2 right-2"
                      />
                      <span className="text-base text-black max-w-[143px] font-normal">
                        {label}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
                <FormMessage className="text-red-500 mt-2 text-sm" />
              </FormItem>
            )}
          />

          <FormButton type="submit" className="w-full">
            Continue
          </FormButton>
        </form>
      </Form>
    </FadeUp>
  );
};

export default CreateAccountPage;
