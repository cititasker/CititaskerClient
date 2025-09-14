import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "../ui/visually-hidden";
import { cn } from "@/lib/utils";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  titleClassName?: string;
  description?: string;
  descriptionClassName?: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  showCloseIcon?: boolean;
  closeIcon?: any;
}
export default function CustomSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  titleClassName,
  descriptionClassName,
  className,
  side = "right",
  showCloseIcon = true,
  closeIcon = undefined,
}: IProps) {
  const hasHeader = title || description;
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={side}
        className={cn("flex flex-col h-full", className)}
        showCloseIcon={showCloseIcon}
        closeIcon={closeIcon}
      >
        {hasHeader && (
          <SheetHeader>
            {title && (
              <SheetTitle className={titleClassName}>{title}</SheetTitle>
            )}
            {description && (
              <SheetDescription className={descriptionClassName}>
                {description}
              </SheetDescription>
            )}
          </SheetHeader>
        )}
        <div className="flex-1 overflow-y-auto no-scrollbar">{children}</div>

        {/* Hidden accessibility elements */}
        {!hasHeader && (
          <>
            <VisuallyHidden asChild>
              <SheetTitle>Sheet</SheetTitle>
            </VisuallyHidden>
            <VisuallyHidden asChild>
              <SheetDescription>Sheet description</SheetDescription>
            </VisuallyHidden>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
