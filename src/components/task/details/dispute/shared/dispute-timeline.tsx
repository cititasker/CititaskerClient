import React from "react";
import { DisputeType } from "@/lib/types/dispute.types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  buildTimelineSteps,
  getLabelStyle,
  getSummaryItem,
} from "../constants";

interface DisputeTimelineProps {
  dispute: DisputeType;
}

export default function DisputeTimeline({ dispute }: DisputeTimelineProps) {
  const timelineSteps = buildTimelineSteps(dispute);
  const activeStepIndex = timelineSteps.findLastIndex((step) => step.active);

  const summaryItems = getSummaryItem(dispute);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-neutral-900 mb-6">
        Dispute Status
      </h3>

      <div className="mb-8">
        <Slider
          value={[activeStepIndex]}
          max={timelineSteps.length - 1}
          step={1}
          disabled
          className="mb-6 [&_[data-orientation=horizontal]]:bg-neutral-200 [&_[data-orientation=horizontal]>span]:bg-success [&_span[data-state]]:bg-success [&_span[data-state]]:border-success"
        />

        <div className="relative mt-6 h-10">
          {timelineSteps.map((step, index) => (
            <div
              key={index}
              className="absolute text-center"
              style={getLabelStyle(index, timelineSteps.length)}
            >
              <p
                className={cn(
                  "text-xs font-medium mb-1 whitespace-nowrap",
                  index <= activeStepIndex ? "text-success" : "text-neutral-500"
                )}
              >
                {step.label}
              </p>

              {step.date && (
                <p className="text-xs text-neutral-400 whitespace-nowrap">
                  {step.date}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Summary Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-neutral-200">
        {summaryItems.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === summaryItems.length - 1;

          return (
            <div
              key={item.label}
              className={cn(
                "space-y-1",
                "text-left",
                "md:text-center",
                isFirst && "md:text-left",
                isLast && "md:text-right"
              )}
            >
              <p className="text-xs text-neutral-500">{item.label}</p>

              {item.isBadge ? (
                <Badge
                  variant={
                    dispute.status === "finished" ? "success" : "secondary"
                  }
                  className={cn(
                    "text-xs",
                    // Align badge correctly
                    isFirst && "md:mr-auto",
                    isLast && "md:ml-auto",
                    !isFirst && !isLast && "md:mx-auto"
                  )}
                >
                  {item.value}
                </Badge>
              ) : (
                <p className="text-sm font-medium text-neutral-900">
                  {item.value}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
