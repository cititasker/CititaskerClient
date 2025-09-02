import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
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
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={side}
        className={className}
        showCloseIcon={showCloseIcon}
        closeIcon={closeIcon}
      >
        <SheetHeader>
          <SheetTitle className={titleClassName}>{title}</SheetTitle>
          {description && (
            <SheetDescription className={descriptionClassName}>
              {description}
            </SheetDescription>
          )}
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
