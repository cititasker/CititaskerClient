import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import FormButton from "../forms/FormButton";
import { cn } from "@/utils";

interface EmptyProps {
  text: string;
  description?: string;
  btnText?: string;
  onAction?: () => void;
  showButton?: boolean;
  icon?: "empty" | "search" | "error" | "loading";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Empty: React.FC<EmptyProps> = ({
  text,
  description,
  btnText,
  onAction,
  showButton = false,
  icon = "empty",
  size = "md",
  className,
}) => {
  const router = useRouter();

  const sizeConfig = {
    sm: {
      imageSize: { width: 120, height: 160 },
      textSize: "text-lg",
      spacing: "gap-3",
    },
    md: {
      imageSize: { width: 174, height: 234 },
      textSize: "text-xl",
      spacing: "gap-4",
    },
    lg: {
      imageSize: { width: 220, height: 280 },
      textSize: "text-2xl",
      spacing: "gap-6",
    },
  };

  const config = sizeConfig[size];

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else {
      router.back();
    }
  };

  // Default button text based on context
  const defaultBtnText = onAction ? "Try Again" : "Go Back";

  return (
    <div
      className={cn(
        "w-full min-h-[400px] h-full bg-background flex items-center justify-center p-4 sm:p-6",
        className
      )}
    >
      <div
        className={cn(
          "flex flex-col items-center text-center max-w-md",
          config.spacing
        )}
      >
        {/* Image/Icon */}
        <div className="relative">
          <Image
            src="/images/empty.png"
            alt="Empty state illustration"
            width={config.imageSize.width}
            height={config.imageSize.height}
            className="opacity-80 h-auto w-[140px] sm:w-[174px]"
            priority
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3
            className={cn(
              "font-bold text-text-primary leading-tight text-sm sm:text-base",
              config.textSize
            )}
          >
            {text}
          </h3>

          {description && (
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Action Button */}
        {showButton && (
          <FormButton
            type="button"
            onClick={handleAction}
            className="w-full max-w-[200px] mt-2"
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {btnText || defaultBtnText}
          </FormButton>
        )}
      </div>
    </div>
  );
};

// Preset variations
export const EmptySearch = (props: Omit<EmptyProps, "icon" | "text">) => (
  <Empty
    icon="search"
    text="No results found"
    description="Try adjusting your search terms"
    btnText="Clear Filters"
    {...props}
  />
);

export const EmptyTasks = (props: Omit<EmptyProps, "text" | "btnText">) => (
  <Empty
    text="No tasks yet"
    description="Create your first task to get started"
    btnText="Post Task"
    {...props}
  />
);

export default Empty;
