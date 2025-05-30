"use client";
import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";
import { StepIconProps } from "@mui/material/StepIcon";
import DotIcon from "./DotIcon";
import FormButton from "@/components/forms/FormButton";

const steps = [
  {
    id: 1,
    label: "February 6, 2024 03:23",
    process: "Start Resolution",
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    id: 2,
    label: "February 6, 2024 03:23",
    process: "In Negotiation",
    description:
      "Horem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Horem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Horem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.",
  },
  {
    id: 3,
    label: "February 6, 2024 03:23",
    process: "CitiTasker steps in",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
  {
    id: 4,
    label: "February 6, 2024 03:23",
    process: "Finished",
    description: `Horem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a,  `,
  },
];

const StepIcon = ({ color }: { color?: string }) => (
  <Box display="flex" alignItems="center" justifyContent="center" ml={0.6}>
    <DotIcon color={color} />
  </Box>
);

function DotStepIcon(props: StepIconProps) {
  const { active, completed } = props;

  if (completed) {
    return <StepIcon color="#236F8E" />;
  } else if (active) {
    return <StepIcon color="#236F8E" />;
  } else {
    return <StepIcon />;
  }
}

export default function VerticalStepper() {
  const [activeStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDate = useMemo(() => {
    const now = new Date();
    return new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 days in milliseconds
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const timeDifference = targetDate.getTime() - now.getTime();

      if (timeDifference <= 0) {
        clearInterval(intervalId);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDifference / 1000) % 60);

        setTimeRemaining({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [targetDate]);

  return (
    <Box sx={{ maxWidth: 700, position: "relative" }}>
      <Stepper orientation="vertical" nonLinear activeStep={activeStep}>
        {steps.map((step) => (
          <Step expanded key={step.id}>
            <StepLabel
              StepIconComponent={DotStepIcon} // Replace the default icon with the dot
            >
              <Typography variant="body2" color="textSecondary">
                {step.label}
              </Typography>
            </StepLabel>
            <StepContent>
              <Typography fontWeight="bold">{step.process}</Typography>
              <Typography>{step.description}</Typography>

              {step.process === "In Negotiation" ? (
                <Box sx={{ p: 3, borderRadius: 2 }}>
                  {/* Countdown Timer and Avatar */}
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Typography variant="body2" fontWeight="bold">
                      {timeRemaining.days} days
                    </Typography>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Box
                        sx={{
                          backgroundColor: "#14213D",
                          color: "#FFFFFF",
                          px: 1,
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant="body2">
                          {String(timeRemaining.hours).padStart(2, "0")}
                        </Typography>
                      </Box>
                      <Typography variant="body2">:</Typography>
                      <Box
                        sx={{
                          backgroundColor: "#14213D",
                          color: "#FFFFFF",
                          px: 1,
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant="body2">
                          {String(timeRemaining.minutes).padStart(2, "0")}
                        </Typography>
                      </Box>
                      <Typography variant="body2">:</Typography>
                      <Box
                        sx={{
                          backgroundColor: "#14213D",
                          color: "#FFFFFF",
                          px: 1,
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant="body2">
                          {String(timeRemaining.seconds).padStart(2, "0")}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Tasker Request Details */}
                  <Box mb={2} display="flex" alignItems="center" gap={2}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ color: "#7C8698" }}
                    >
                      Tasker’s Request:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      Refund Only
                    </Typography>
                  </Box>

                  <Box mb={2} display="flex" alignItems="center" gap={2}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ color: "#7C8698" }}
                    >
                      Refund Amount:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      N30,000.00
                    </Typography>
                  </Box>

                  <Box mb={2} display="flex" alignItems="start" gap={2}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ color: "#7C8698", width: "400px" }}
                    >
                      Tasker’s message:
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      nsectetur adipiscing elit. Etiam eu turpis molestie,
                      dictum est a, mattis tellus. Sed dignissim, metus nec
                      fringilla accumsan, risus sem sollicitudin lacus, ut
                      interdum tellus elit sed risus. Horem ipsum dolor sit
                      amet,
                    </Typography>
                  </Box>

                  <Box mb={2} display="flex" alignItems="center" gap={2}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ color: "#7C8698" }}
                    >
                      Tasker’s evidence:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      Not Started
                    </Typography>
                  </Box>

                  {/* Action Buttons */}
                  <Box display="flex" gap={2} mt={2}>
                    <FormButton className="text-primary border-[1.5px] border-primary bg-transparant">
                      Accept
                    </FormButton>
                    <FormButton>Reject All</FormButton>
                  </Box>
                </Box>
              ) : null}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
