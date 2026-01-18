"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

// Types
interface AccordionHTMLItem {
  question: string;
  answer: string; // HTML string
}

interface AccordionWithHTMLProps {
  data: AccordionHTMLItem[];
  variant?: "default" | "tasker" | "modern";
  className?: string;
  type?: "single" | "multiple";
  defaultValue?: string;
  collapsible?: boolean;
}

// Main AccordionWithHTML Component
const AccordionWithHTML: React.FC<AccordionWithHTMLProps> = ({
  data,
  variant = "default",
  className,
  type = "single",
  defaultValue,
  collapsible = true,
}) => {
  const variantStyles = {
    default: {
      item: "border-2 border-neutral-800 rounded-2xl overflow-hidden bg-white shadow-sm data-[state=open]:border-primary transition-colors duration-300",
      trigger: "px-4 sm:px-6 py-4 text-left hover:no-underline group",
      question:
        "text-sm sm:text-base text-neutral-900 group-data-[state=open]:text-primary transition-colors duration-300 font-semibold",
      content: "px-4 sm:px-6 pb-4 text-sm sm:text-base text-neutral-700",
    },
    tasker: {
      item: "border-2 border-primary-300 rounded-2xl overflow-hidden bg-primary-50 shadow-sm data-[state=open]:border-primary transition-colors duration-300",
      trigger: "px-4 sm:px-6 py-4 text-left hover:no-underline group",
      question:
        "text-sm sm:text-base text-neutral-900 group-data-[state=open]:text-primary transition-colors duration-300 font-bold",
      content: "px-4 sm:px-6 pb-4 text-sm sm:text-base text-neutral-800",
    },
    modern: {
      item: "border border-border rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-md data-[state=open]:shadow-lg transition-all duration-300",
      trigger: "px-6 py-5 text-left hover:no-underline group hover:bg-muted/50",
      question:
        "text-base font-semibold text-foreground group-data-[state=open]:text-primary transition-colors duration-300",
      content: "px-6 pb-5 text-sm text-muted-foreground",
    },
  };

  const styles = variantStyles[variant];

  // Conditional props based on accordion type
  const accordionProps =
    type === "single"
      ? {
          type: "single" as const,
          collapsible,
          defaultValue,
        }
      : {
          type: "multiple" as const,
          defaultValue: defaultValue ? [defaultValue] : undefined,
        };

  return (
    <Accordion
      {...accordionProps}
      className={cn("w-full space-y-4", className)}
    >
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className={styles.item}
        >
          <AccordionTrigger className={styles.trigger}>
            <span className={styles.question}>{item.question}</span>
          </AccordionTrigger>
          <AccordionContent className={styles.content}>
            <div
              dangerouslySetInnerHTML={{ __html: item.answer }}
              className={cn(
                "prose prose-base max-w-none leading-relaxed",
                // List styling
                "[&>ul]:list-disc [&>ul]:list-inside [&>ul]:space-y-1.5 [&>ul]:my-3",
                "[&>ol]:list-decimal [&>ol]:list-inside [&>ol]:space-y-1.5 [&>ol]:my-3",
                // Nested list styling
                "[&_ul_ul]:list-disc [&_ul_ul]:ml-6 [&_ol_ol]:ml-6",
                "[&_ul_ol]:list-decimal [&_ul_ol]:ml-6 [&_ol_ul]:list-disc [&_ol_ul]:ml-6",
                // Paragraph styling
                "[&>p]:mb-3 [&>p:last-child]:mb-0",
                // Strong/bold styling
                "[&_strong]:font-semibold [&_strong]:text-neutral-900",
                // Link styling
                "[&_a]:text-primary [&_a]:underline [&_a:hover]:text-primary-600",
                // Code styling
                "[&_code]:bg-neutral-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm",
                // Blockquote styling
                "[&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic"
              )}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionWithHTML;

// Export types for external use
export type { AccordionHTMLItem, AccordionWithHTMLProps };
