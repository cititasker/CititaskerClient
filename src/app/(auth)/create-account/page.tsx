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

const style: Record<string, SxProps<Theme>> = {
  container: {
    ".radio_group": {
      display: "flex",
      flexDirection: "row",
      gap: "20px",
      [theme.breakpoints.up("sm")]: {
        gap: "36px",
      },

      ".label": {
        maxWidth: "200px",
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
        p: "5px",
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
  formLabel: {
    fontSize: "20px",
    color: "var(--black)",
    fontWeight: 600,
    mb: "3.75rem",
  },
};

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

  const handleChange = (value: string) => {
    setValue("role", value);
  };

  const submit: SubmitHandler<createAccountSchemaType> = ({ role }) => {
    router.push(`/signup?role=${role}`);
  };

  return (
    <div className="max-w-[436px] mx-auto">
      <form onSubmit={handleSubmit(submit)}>
        <FormControl className="!mb-8" sx={style.container}>
          <FormLabel
            sx={style.formLabel}
            className="!text-black-2 text-xl font-semibold text-center"
          >
            What will you like to do on CitiTasker?
          </FormLabel>
          <div className="radio_group">
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <FormLabel
                  component="label"
                  htmlFor="tasker"
                  className={`label ${
                    field.value.includes("tasker") && "border border-primary"
                  }`}
                >
                  <Radio
                    id="tasker"
                    checked={field.value.includes("tasker")}
                    onClick={() => {
                      handleChange("tasker");
                    }}
                    value="tasker"
                    inputProps={{ "aria-label": "Tasker" }}
                  />
                  <Typography className="label_text">
                    I want to earn as a Tasker.
                  </Typography>
                </FormLabel>
              )}
            />
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <FormLabel
                  component="label"
                  htmlFor="poster"
                  className={`label ${
                    field.value.includes("poster") && "border border-primary"
                  }`}
                >
                  <Radio
                    id="poster"
                    checked={field.value.includes("poster")}
                    onClick={() => {
                      handleChange("poster");
                    }}
                    value="poster"
                    inputProps={{ "aria-label": "Poster" }}
                  />
                  <Typography className="label_text">
                    I want to post tasks on CitiTasker.
                  </Typography>
                </FormLabel>
              )}
            />
          </div>
          <FormHelperText className="!text-red-500">
            {errors.role?.message}
          </FormHelperText>
        </FormControl>
        <FormButton type="submit" btnStyle="w-full">
          Continue
        </FormButton>
      </form>
    </div>
  );
};

export default CreateAccountPage;
