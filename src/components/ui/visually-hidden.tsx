// components/ui/visually-hidden.tsx
import * as React from "react";
import { VisuallyHidden as RadixVisuallyHidden } from "@radix-ui/react-visually-hidden";

export const VisuallyHidden = React.forwardRef<
  React.ElementRef<typeof RadixVisuallyHidden>,
  React.ComponentPropsWithoutRef<typeof RadixVisuallyHidden>
>(({ children, ...props }, ref) => {
  return (
    <RadixVisuallyHidden {...props} ref={ref}>
      {children}
    </RadixVisuallyHidden>
  );
});

VisuallyHidden.displayName = "VisuallyHidden";
