"use client";

import React, { useState, useEffect, useMemo } from "react";
import { cn } from "@/utils";
import FormButton from "@/components/forms/FormButton";

const steps = [
  {
    id: 1,
    label: "February 6, 2024 03:23",
    process: "Start Resolution",
    description: `For each ad campaign that you create, you can control how much you're willing to spend...`,
  },
  {
    id: 2,
    label: "February 6, 2024 03:23",
    process: "In Negotiation",
    description: `Horem ipsum dolor sit amet, consectetur adipiscing elit...`,
  },
  {
    id: 3,
    label: "February 6, 2024 03:23",
    process: "CitiTasker steps in",
    description: `Try out different ad text to see what brings in the most customers...`,
  },
  {
    id: 4,
    label: "February 6, 2024 03:23",
    process: "Finished",
    description: `Horem ipsum dolor sit amet, consectetur adipiscing elit...`,
  },
];

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
    return new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // +2 days
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(intervalId);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeRemaining({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  return (
    <div className="max-w-3xl space-y-8 relative">
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isCompleted = index < activeStep;

        return (
          <div key={step.id} className="relative pl-8 border-l-2 border-muted">
            <div
              className={cn(
                "absolute left-[-10px] top-[6px] w-3 h-3 rounded-full",
                isCompleted || isActive ? "bg-primary" : "bg-muted"
              )}
            />
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">{step.label}</p>
              <h3 className="font-bold text-base">{step.process}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>

            {step.process === "In Negotiation" && (
              <div className="bg-muted/40 mt-4 rounded-xl p-4 space-y-4">
                {/* Countdown */}
                <div className="flex gap-2 text-sm items-center">
                  <span className="font-semibold">
                    {timeRemaining.days} days
                  </span>
                  <div className="flex items-center gap-1 bg-background rounded px-2 py-1">
                    <span>{String(timeRemaining.hours).padStart(2, "0")}</span>
                    <span>:</span>
                    <span>
                      {String(timeRemaining.minutes).padStart(2, "0")}
                    </span>
                    <span>:</span>
                    <span>
                      {String(timeRemaining.seconds).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Request Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span className="text-muted-foreground">
                      Tasker’s Request:
                    </span>
                    <span className="font-semibold">Refund Only</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground">
                      Refund Amount:
                    </span>
                    <span className="font-semibold">N30,000.00</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground">
                      Tasker’s message:
                    </span>
                    <p className="text-gray-600">
                      nsectetur adipiscing elit. Etiam eu turpis molestie...
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground">
                      Tasker’s evidence:
                    </span>
                    <span className="font-semibold">Not Started</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <FormButton
                    className="border border-primary text-primary bg-transparent hover:bg-primary/10"
                    type="button"
                  >
                    Accept
                  </FormButton>
                  <FormButton type="button">Reject All</FormButton>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
