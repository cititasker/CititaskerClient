import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

export const ReusableAccordion = ({
  data,
  variant = "default",
  className,
}: {
  data: FAQItem[];
  variant?: "default" | "tasker";
  className?: string;
}) => (
  <Accordion
    type="single"
    collapsible
    className={cn("w-full space-y-4", className)}
  >
    {data.map((item, index) => (
      <AccordionItem
        key={index}
        value={`item-${index}`}
        className="border-2 border-neutral-800 rounded-2xl overflow-hidden bg-white shadow-sm data-[state=open]:border-primary transition-all duration-300 hover:shadow-md"
      >
        <AccordionTrigger className="px-4 sm:px-6 py-4 sm:py-5 text-left hover:no-underline group [&[data-state=open]>svg]:rotate-180">
          <span
            className={cn(
              "text-sm sm:text-base text-neutral-900 group-data-[state=open]:text-primary transition-colors duration-300 pr-4",
              variant === "tasker" ? "font-bold" : "font-semibold"
            )}
          >
            {item.question}
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-4 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-base text-neutral-700 leading-relaxed animate-accordion-down">
          {item.answer}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);
