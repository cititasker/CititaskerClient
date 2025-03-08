import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import React from "react";
import Icons from "../Icons";
import Grid from "@mui/material/Grid2";
import FormInput from "@/components/forms/FormInput";
import { FormProvider, useForm } from "react-hook-form";
import FormSelect from "@/components/forms/FormSelect";
import FormDatePicker from "@/components/forms/FormDatePicker";
import PaymentStatus from "@/components/dashboard/PaymentStatus";
import FormButton from "@/components/forms/FormButton";
import KycVerication from "../KycVerication";
import { useAppSelector } from "@/store/hook";
import PaystackButton from "../PaystackButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { maxDate } from "@/utils";

const options = [
  { id: "male", name: "Male" },
  { id: "female", name: "Female" },
];

const style: Record<string, SxProps<Theme>> = {
  container: {
    ".MuiAccordion-root": {
      boxShadow: "none",
      border: "1px solid var(--dark-grey)",
      borderRadius: "20px !important",
      mb: "20px",
      overflow: "hidden",

      "&:last-of-type": {
        mb: 0,
      },

      "&:before": {
        display: "none",
      },

      ".MuiAccordion-heading": {
        border: "none",
      },

      ".MuiAccordionSummary-root": {
        height: "80px",
        px: "40px",
        ".MuiAccordionSummary-content": {
          my: 0,
        },
      },
      ".MuiAccordionDetails-root": {
        px: "40px",
      },
      ".Mui-expanded": {
        minHeight: "auto",
      },
      "&.Mui-expanded": {
        minHeight: "auto",
      },
    },
  },
};

const schema = z.object({
  first_name: z.string().min(1, { message: "First name is reqired" }),
  last_name: z.string().min(1, { message: "Last name is reqired" }),
  email: z.string().email({ message: "Must be a valid email" }),
  phone_number: z.string().min(1, { message: "Phone number is reqired" }),
  gender: z.string().min(1, { message: "Gender is reqired" }),
  date_of_birth: z.string().min(1, { message: "Date of birth is reqired" }),
});

type schemaType = z.infer<typeof schema>;

const KYC = () => {
  const { user } = useAppSelector((state) => state.user);

  const methods = useForm<schemaType>({
    defaultValues: {
      first_name: user.first_name ?? "",
      last_name: user.last_name ?? "",
      email: user.email ?? "",
      phone_number: user.phone_number ?? "",
      gender: user.gender ?? "",
      date_of_birth: user.date_of_birth ?? "",
    },
    resolver: zodResolver(schema),
  });
  const { handleSubmit } = methods;

  const data = {
    user_ref: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  } as any;

  const handleVerification = (value: any) => {
    console.log(6677, value);
  };

  const handleSuccess = (transaction: any) => {
    console.log(998, transaction);
  };

  const onSubmit = (values: schemaType) => {
    console.log(values);
  };
  return (
    <Box sx={style.container} className="px-10">
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<Icons.dropdown />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="flex items-center gap-5">
            <Typography className="text-base text-black">Profile</Typography>
            <PaymentStatus status="successful" name="Completed" />
          </div>
        </AccordionSummary>
        <AccordionDetails className="max-w-[716px]">
          <Typography className="text-dark-grey-2">
            Help us keep CitiTasker safe and fun, and fill in a few details.
          </Typography>
          <div className="mt-[34px]">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container columnSpacing="32px">
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormInput name="first_name" label="First Name" />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormInput name="last_name" label="Last Name" />
                  </Grid>
                </Grid>
                <Grid container columnSpacing="32px">
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormInput name="email" label="Email" />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormInput name="phone_number" label="Phone Number" />
                  </Grid>
                </Grid>
                <Grid container columnSpacing="32px">
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormSelect
                      name="gender"
                      label="Gender"
                      options={options}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormDatePicker
                      name="date_of_birth"
                      label="Date of Birth"
                      maxDate={maxDate}
                    />
                  </Grid>
                </Grid>
                <FormButton text="Save" type="submit" btnStyle="w-full mt-5" />
              </form>
            </FormProvider>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<Icons.dropdown />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="flex items-center gap-5">
            <Typography className="text-base text-black">
              BVN Verification
            </Typography>
            <PaymentStatus status="on_hold" name="Action Needed" />
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="w-full min-h-[300px] relative">
            {/* <FormButton text="Take a photo" btnStyle="" /> */}
            <KycVerication
              text="Start Verification"
              handleSubmit={handleVerification}
              data={data}
              className="absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] font-medium rounded-[9.75px]"
            />
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<Icons.dropdown />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="flex items-center gap-5">
            <Typography className="text-base text-black">
              Payment Method
            </Typography>
            <PaymentStatus status="on_hold" name="Action Needed" />
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="w-full min-h-[300px] relative">
            <PaystackButton
              data={{ email: user?.email || "", amount: 500 }}
              handleSuccess={handleSuccess}
              metadata={{}}
              text="Verify with Paystack"
              className="absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] rounded-[9.75px]"
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default KYC;
