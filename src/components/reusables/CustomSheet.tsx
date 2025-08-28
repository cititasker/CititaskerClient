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
}
export default function CustomSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  titleClassName,
  descriptionClassName,
}: IProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
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
