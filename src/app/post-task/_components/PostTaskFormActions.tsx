"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FormButton from "@/components/forms/FormButton";
import { cn } from "@/lib/utils";

interface PostTaskFormActionsProps {
  loading?: boolean;
  type?: "submit" | "button";
  onClick?: () => void;
  className?: string;
  okText?: string;
}

const PostTaskFormActions: React.FC<PostTaskFormActionsProps> = ({
  loading = false,
  type = "submit",
  onClick,
  className,
  okText,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const step = Number(searchParams.get("step") ?? 1);

  // Navigate to previous step
  const handleBack = () => {
    if (step <= 1) return;
    const url = new URL(window.location.href);
    url.searchParams.set("step", String(step - 1));
    router.push(url.toString());
  };

  // Compute next button label based on step
  const nextLabel =
    step < 4 ? "Next" : step === 4 ? "Preview" : `${okText ?? "Submit"}`;

  return (
    <div
      className={cn(
        "w-full flex flex-col-reverse sm:flex-row gap-3 sm:gap-8 items-center mt-5 sm:mt-auto pb-5",
        className
      )}
    >
      {step > 1 && (
        <FormButton
          variant="outline"
          className="flex-1 w-full"
          onClick={handleBack}
          disabled={loading}
        >
          Back
        </FormButton>
      )}

      <FormButton
        type={type}
        className="flex-1 w-full"
        onClick={onClick}
        disabled={loading}
      >
        {loading ? "Loading..." : nextLabel}
      </FormButton>
    </div>
  );
};

export default PostTaskFormActions;
