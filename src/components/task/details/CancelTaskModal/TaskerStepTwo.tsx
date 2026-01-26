// components/TaskerStepTwo.tsx
import { memo } from "react";
import { TrendingUp, ListChecks, AlertCircle } from "lucide-react";
import FormCheckbox from "@/components/forms/FormCheckbox";
import AcceptTermsCheckboxLabel from "@/components/reusables/AcceptTermsCheckboxLabel";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface CancellationImpactItemProps {
  icon: React.ReactNode;
  text: React.ReactNode;
  variant?: "info" | "warning" | "danger";
}

const CancellationImpactItem = memo<CancellationImpactItemProps>(
  ({ icon, text, variant = "info" }) => {
    const bgColors = {
      info: "bg-info-light/20",
      warning: "bg-warning-light/20",
      danger: "bg-error-light/20",
    };

    return (
      <div className="flex items-start gap-3">
        <div
          className={`w-10 h-10 rounded-lg ${bgColors[variant]} flex items-center justify-center flex-shrink-0`}
        >
          {icon}
        </div>
        <p className="text-sm text-text-primary leading-relaxed pt-2">{text}</p>
      </div>
    );
  },
);

CancellationImpactItem.displayName = "CancellationImpactItem";

export const TaskerStepTwo = memo(() => {
  return (
    <div className="space-y-6">
      {/* Cancellation Impacts */}
      <div className="space-y-4">
        <CancellationImpactItem
          icon={<TrendingUp className="w-5 h-5 text-info" />}
          text={
            <span>
              <strong>Revenue:</strong> You will lose the revenue from this task
            </span>
          }
          variant="info"
        />

        <CancellationImpactItem
          icon={<ListChecks className="w-5 h-5 text-success" />}
          text={
            <span>
              <strong>Completion Rate:</strong> Your completion rate will reduce
              making it harder for you to be assigned to tasks
            </span>
          }
          variant="warning"
        />

        <CancellationImpactItem
          icon={<AlertCircle className="w-5 h-5 text-error" />}
          text={
            <span>
              <strong>CitiTasker Account:</strong> Repeatedly cancelling tasks
              can result in your CitiTasker account being limited or
              deactivated.{" "}
              <Link
                href="/help/cancellation-policy"
                className="text-primary hover:text-primary-600 underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                See more details here.
              </Link>
            </span>
          }
          variant="danger"
        />
      </div>

      {/* Terms Agreement */}
      <FormCheckbox
        name="agreed"
        label={<AcceptTermsCheckboxLabel />}
        required
      />
    </div>
  );
});

TaskerStepTwo.displayName = "TaskerStepTwo";
