"use client";
import FormButton from "@/components/forms/FormButton";
import theme from "@/providers/theme";
import { createAccountSchema, createAccountSchemaType } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Theme, SxProps } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ROLE } from "@/constant";
import { cn } from "@/utils";
import FadeUp from "@/components/reusables/FadeUp";

const style: Record<string, SxProps<Theme>> = {
  container: {
    ".radio_group": {
      display: "flex",
      flexDirection: "row",
      gap: "20px",

      ".label": {
        // maxWidth: "200px",
        width: "100%",
        height: "200px",
        borderRadius: "20px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        bgcolor: "white",
        boxShadow: "0px 3px 4px 0px rgba(0, 0, 0, 0.03)",
        p: "10px",
        ml: 0,
        mr: 0,
        ".MuiButtonBase-root": {
          position: "absolute",
          top: "10px",
          right: "10px",
        },
        ".MuiTypography-root": {
          fontSize: "16px",
          fontWeight: 400,
          color: "var(--black)",
          userSelect: "none",
        },
      },
    },
  },
};

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
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<createAccountSchemaType>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      role: "",
    },
  });

  const submit: SubmitHandler<createAccountSchemaType> = ({ role }) => {
    router.push(`/signup?role=${role}`);
  };

  return (
    <FadeUp className="max-w-[466px] mx-auto">
      <form onSubmit={handleSubmit(submit)}>
        <FormControl className="!mb-8" sx={style.container}>
          <div className="text-center space-y-1 sm:space-y-2 mb-10 sm:mb-[3.75rem]">
            <h2 className="text-black-2 text-2xl sm:text-[1.875rem] font-semibold text-center">
              Start your journey on CitiTasker
            </h2>
            <p className="text-dark-grey-2 text-base sm:text-xl">
              Select an option below to get started
            </p>
          </div>
          <div className="radio_group">
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5 w-full">
                  {roleOptions.map(({ id, label }) => (
                    <FormLabel
                      key={id}
                      component="label"
                      htmlFor={id}
                      className={cn(
                        "label",
                        field.value === id && "border border-primary"
                      )}
                    >
                      <Radio
                        id={id}
                        checked={field.value === id}
                        onClick={() => setValue("role", id)}
                        value={id}
                        inputProps={{ "aria-label": id }}
                      />
                      <Typography className="label_text max-w-[143px]">
                        {label}
                      </Typography>
                    </FormLabel>
                  ))}
                </div>
              )}
            />
          </div>
          <FormHelperText className="!text-red-500">
            {errors.role?.message}
          </FormHelperText>
        </FormControl>
        <FormButton type="submit" className="w-full">
          Continue
        </FormButton>
      </form>
    </FadeUp>
  );
};

export default CreateAccountPage;
