import ExtraInfo from "@/components/forms/ExtraInfo";
import ActionsButtons from "@/components/reusables/ActionButtons";
import {
  FEEDBACK_CONFIG,
  SIZE_CONFIG,
} from "@/components/reusables/Modals/UniversalFeedbackModal/constants";
import { cn } from "@/lib/utils";
import React from "react";

interface IProps {
  taskerName?: string;
  onClose: () => void;
}

export default function PaymentSuccess({ taskerName, onClose }: IProps) {
  const config = FEEDBACK_CONFIG.success;
  const sizeConfig = SIZE_CONFIG.md;
  const IconComponent = config.icon;

  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={cn(
          sizeConfig.icon,
          config.iconBg,
          config.borderColor,
          "rounded-full flex items-center justify-center border-2"
        )}
      >
        <IconComponent className={cn(sizeConfig.iconSize, config.iconColor)} />
      </div>

      <h2
        id="payment-success-title"
        className="mt-4 text-xl font-semibold text-black-2"
      >
        Payment Successfully Secured 🎉
      </h2>

      <p
        id="payment-success-description"
        className="mt-6 text-base text-black-2 max-w-[400px]"
      >
        {`Your payment is secured and ${taskerName} has been notified to begin your task. You’ll only release the payment when the task is completed to your satisfaction.`}
      </p>

      <ExtraInfo className="mt-6">
        You can now send private messages with important information like the
        task location. Message your tasker the details to get your task done.
      </ExtraInfo>

      <ActionsButtons
        cancelText="Go to task"
        okText={`Message ${taskerName}`}
        className="mt-10 font-medium"
        handleCancel={onClose}
      />
    </div>
  );
}
