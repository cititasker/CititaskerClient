import { Card } from "@/components/ui/card";
import { VerificationStep } from "./constant";
import FormButton from "@/components/forms/FormButton";
import { CustomStatusBadge } from "@/components/reusables/CustomStatusBadge";

export const VerificationStepCard = ({ step }: { step: VerificationStep }) => {
  const { icon: Icon, label, description, completed, href, actionText } = step;

  return (
    <Card className="p-4 border border-neutral-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
        {/* Left Side - Icon and Info */}
        <div className="flex items-start gap-3 flex-1">
          <div
            className={`p-2 rounded-lg ${
              completed ? "bg-success-light" : "bg-neutral-100"
            }`}
          >
            <Icon
              className={`w-5 h-5 ${
                completed ? "text-success" : "text-text-muted"
              }`}
            />
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-text-primary">{label}</h3>
              {completed && (
                <CustomStatusBadge status="successful" label="Verified" />
              )}
            </div>
            <p className="text-sm text-text-muted">{description}</p>
          </div>
        </div>

        {/* Right Side - Action Button */}
        <div className="sm:ml-4">
          <FormButton
            size="sm"
            href={!completed ? href : undefined}
            disabled={completed}
            className={`min-w-[100px] ${
              completed
                ? "bg-success text-white border-success hover:bg-success"
                : "btn-primary"
            }`}
            variant="custom"
          >
            {completed ? "Verified" : actionText}
          </FormButton>
        </div>
      </div>
    </Card>
  );
};
