"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Users, Briefcase } from "lucide-react";

import { ROLE } from "@/constant";
import { cn } from "@/utils";
import { createAccountSchema, createAccountSchemaType } from "@/schema/auth";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import FormButton from "@/components/forms/FormButton";
import AuthCard from "../components/AuthCard";

const roleOptions = [
  {
    id: ROLE.tasker,
    label: "I want to earn as a Tasker",
    description: "Find tasks and earn money with your skills",
    icon: Users,
    color: "border-success bg-success-light text-success-600",
  },
  {
    id: ROLE.poster,
    label: "I want to post tasks",
    description: "Get help with your tasks from skilled people",
    icon: Briefcase,
    color: "border-primary-400 bg-primary-50 text-primary-600",
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
    <AuthCard className="max-w-2xl">
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-3">
          Start your journey on CitiTasker
        </h2>
        <p className="text-text-secondary text-base">
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
                  className="space-y-4"
                >
                  {roleOptions.map(
                    ({ id, label, description, icon: Icon, color }) => (
                      <Label
                        key={id}
                        htmlFor={id}
                        className={cn(
                          "flex items-center p-6 rounded-xl cursor-pointer transition-all duration-200 border",
                          field.value === id
                            ? color
                            : "border-border-light bg-background-secondary hover:border-border-medium hover:bg-background-tertiary"
                        )}
                      >
                        <RadioGroupItem
                          id={id}
                          value={id}
                          className="sr-only"
                        />

                        <div className="flex items-center gap-4 flex-1">
                          <div
                            className={cn(
                              "p-3 rounded-lg hidden xs:inline-block",
                              field.value === id
                                ? "bg-white/20"
                                : "bg-background"
                            )}
                          >
                            <Icon className="w-6 h-6" />
                          </div>

                          <div className="flex-1 text-left">
                            <h3 className="font-semibold text-lg mb-1">
                              {label}
                            </h3>
                            <p className="text-sm opacity-80">{description}</p>
                          </div>
                        </div>

                        {field.value === id && (
                          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-current" />
                          </div>
                        )}
                      </Label>
                    )
                  )}
                </RadioGroup>
                <FormMessage className="text-error mt-2" />
              </FormItem>
            )}
          />

          <FormButton
            type="submit"
            className="w-full h-12 text-base font-medium"
            disabled={!form.watch("role")}
          >
            Continue
          </FormButton>
        </form>
      </Form>
    </AuthCard>
  );
};

export default CreateAccountPage;
