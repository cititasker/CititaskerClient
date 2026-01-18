"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Users, Briefcase, Check } from "lucide-react";

import { ROLE } from "@/constant";
import { cn } from "@/utils";
import { createAccountSchema, createAccountSchemaType } from "@/schema/auth";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import FormButton from "@/components/forms/FormButton";
import AuthCard from "@/components/auth/AuthCard";

const roleOptions = [
  {
    id: ROLE.tasker,
    label: "I Want to Earn as a Tasker",
    description: "Find tasks and earn money with your skills",
    icon: Users,
  },
  {
    id: ROLE.poster,
    label: "I Want to Post Tasks",
    description: "Get help with your tasks from skilled people",
    icon: Briefcase,
  },
];

const RoleOption = React.memo(
  ({
    option,
    isSelected,
  }: {
    option: (typeof roleOptions)[0];
    isSelected: boolean;
    fieldValue: string;
  }) => {
    const Icon = option.icon;

    return (
      <div className="relative">
        <Label
          htmlFor={option.id}
          className={cn(
            "group relative flex flex-col h-full p-4",
            "rounded-lg cursor-pointer transition-all duration-300",
            "border hover:shadow-sm min-h-[120px] sm:min-h-[130px]",
            isSelected
              ? "border-primary bg-primary-50 text-primary"
              : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50"
          )}
        >
          <RadioGroupItem
            id={option.id}
            value={option.id}
            className={cn(
              "absolute top-3 right-3 hidden sm:flex w-4 h-4",
              "data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            )}
          />

          <div className="flex flex-col h-full">
            <div className="flex items-start gap-3 mb-3">
              <div
                className={cn(
                  "p-2 rounded-lg transition-all duration-300",
                  "flex items-center justify-center flex-shrink-0",
                  isSelected
                    ? "bg-primary"
                    : "bg-neutral-100 group-hover:bg-neutral-200"
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors duration-300",
                    isSelected
                      ? "text-white"
                      : "text-neutral-600 group-hover:text-neutral-700"
                  )}
                />
              </div>

              <div
                className={cn(
                  "sm:hidden ml-auto p-1 rounded-full transition-all duration-300",
                  isSelected
                    ? "bg-success text-white"
                    : "bg-neutral-200 opacity-0 group-hover:opacity-100"
                )}
              >
                <Check className="w-2.5 h-2.5" />
              </div>
            </div>

            <div className="flex-1 text-left">
              <h3
                className={cn(
                  "font-semibold text-base sm:text-lg mb-1 leading-tight transition-colors duration-300",
                  isSelected ? "text-current" : "text-text-primary"
                )}
              >
                {option.label}
              </h3>

              <p
                className={cn(
                  "text-xs sm:text-sm leading-relaxed transition-colors duration-300",
                  isSelected ? "text-current opacity-90" : "text-text-secondary"
                )}
              >
                {option.description}
              </p>
            </div>
          </div>
        </Label>
      </div>
    );
  }
);

RoleOption.displayName = "RoleOption";

const CreateAccountPage = () => {
  const router = useRouter();
  const form = useForm<createAccountSchemaType>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: { role: "" },
  });

  const onSubmit = ({ role }: createAccountSchemaType) => {
    router.push(`/auth/signup?role=${role}`);
  };

  const selectedRole = form.watch("role");

  return (
    <AuthCard className="max-w-3xl">
      <div className="text-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">
          Start Your Journey on CitiTasker
        </h1>
        <p className="text-sm sm:text-base text-text-secondary">
          Choose how you want to use our platform
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid grid-cols-1 gap-3"
                >
                  {roleOptions.map((option) => (
                    <RoleOption
                      key={option.id}
                      option={option}
                      isSelected={field.value === option.id}
                      fieldValue={field.value}
                    />
                  ))}
                </RadioGroup>
                <FormMessage className="text-error text-sm mt-3" />
              </FormItem>
            )}
          />

          <div className="pt-3">
            <FormButton
              type="submit"
              className={cn(
                "w-full h-10 text-sm font-medium transition-all duration-300",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              disabled={!selectedRole}
            >
              Continue to Sign Up
            </FormButton>
          </div>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-xs sm:text-sm text-text-muted">
          You can always change your role later in your account settings
        </p>
      </div>
    </AuthCard>
  );
};

export default CreateAccountPage;
