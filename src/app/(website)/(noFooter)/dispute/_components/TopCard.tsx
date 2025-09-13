"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/utils";
import React from "react";

const stepMarks = [
  { value: 0, label: "Start" },
  { value: 33, label: "In Negotiation" },
  { value: 66, label: "CitiTasker steps in" },
  { value: 100, label: "Finished" },
];

const TopCard = () => {
  const currentStep = 66;

  return (
    <Card className="rounded-[30px] overflow-hidden mb-5 border-none shadow-sm bg-white">
      <CardHeader className="bg-primary h-[70px] px-[30px] flex items-center text-white">
        {/* Optional header content here */}
      </CardHeader>
      <CardContent className="py-6 px-5">
        <div className="w-[90%] mx-auto">
          {/* Custom Step Slider */}
          <div className="relative h-10">
            <div className="absolute top-5 left-0 w-full h-2 bg-muted rounded-full" />
            <div
              className="absolute top-5 h-2 bg-green-600 rounded-full"
              style={{ width: `${currentStep}%` }}
            />
            <div className="flex justify-between relative z-10">
              {stepMarks.map((mark) => (
                <div key={mark.value} className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border-2",
                      mark.value <= currentStep
                        ? "bg-green-600 border-green-600"
                        : "bg-white border-gray-300"
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm mt-2",
                      mark.value <= currentStep
                        ? "text-green-600 font-medium"
                        : "text-muted-foreground"
                    )}
                  >
                    {mark.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dispute Info */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-y-6 mt-10 mb-6 gap-x-5 text-sm">
            <InfoItem label="Dispute ID" value="3NH592FKE" />
            <InfoItem label="Proposal" value="3NH592FKE" />
            <InfoItem label="Date Submitted" value="12 July 2024" />
            <InfoItem label="Amount" value="N30,000.00" />
            <InfoItem label="Resolution Status" value="N30,000.00" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-muted-foreground mb-1">{label}</p>
    <p className="text-black font-medium">{value}</p>
  </div>
);

export default TopCard;
