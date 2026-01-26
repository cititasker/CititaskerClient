"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, ArrowRight } from "lucide-react";

interface PostTaskFormActionsProps {
  loading?: boolean;
  type?: "submit" | "button";
  onClick?: () => void;
  className?: string;
  okText?: string;
  backwardStep?: string;
  disabled?: boolean;
}

const PostTaskFormActions: React.FC<PostTaskFormActionsProps> = ({
  loading = false,
  type = "submit",
  onClick,
  className,
  okText,
  backwardStep,
  disabled = false,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const step = Number(searchParams.get("step") ?? 1);

  const handleBack = () => {
    if (step <= 1) return;
    const url = new URL(window.location.href);
    url.searchParams.set("step", backwardStep ?? String(step - 1));
    router.push(url.toString());
  };

  const getButtonText = () => {
    if (okText) return okText;
    if (step < 4) return "Continue";
    if (step === 4) return "Review";
    return "Submit";
  };

  const showBackButton = step > 1;

  return (
    <div
      className={cn(
        "flex flex-col-reverse xs:flex-row gap-3 items-stretch sm:items-center flex-shrink-0 mt-auto border-t border-border-light",
        "p-4 sm:p-6",
        className,
      )}
    >
      {/* Back button - Equal width on desktop */}
      {showBackButton && (
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={loading}
          className={cn(
            "h-12",
            "w-full sm:flex-1", // Equal width on desktop
            "border-border-medium text-text-secondary",
            "hover:bg-background-secondary hover:text-text-primary hover:border-border-strong",
            "transition-all duration-200",
          )}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      )}

      {/* Primary action button - Equal width on desktop */}
      <Button
        type={type}
        onClick={onClick}
        disabled={loading || disabled}
        className={cn(
          "h-12",
          "w-full sm:flex-1", // Equal width on desktop
          "btn-primary relative overflow-hidden group",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          loading && "pointer-events-none",
        )}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Processing...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <span className="font-semibold">{getButtonText()}</span>
            {step < 5 && !okText?.includes("Submit") && (
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            )}
          </div>
        )}

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </Button>
    </div>
  );
};

export default PostTaskFormActions;
