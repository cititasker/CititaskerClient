import { Card } from "@/components/ui/card";
import { VerificationStep } from "./constant";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import FormButton from "@/components/forms/FormButton";

export const VerificationStepCard = ({ step }: { step: VerificationStep }) => {
  const { icon: Icon, label, description, completed, href, actionText } = step;

  return (
    <Card className="p-4 border border-neutral-200">
      <div className="flex items-center justify-between">
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
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-text-primary">{label}</h3>
              {completed && (
                <Badge
                  variant="outline"
                  className="bg-success-light text-success border-success/30"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-sm text-text-muted">{description}</p>
          </div>
        </div>

        {/* Right Side - Action Button */}
        <div className="flex-shrink-0 ml-4">
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
