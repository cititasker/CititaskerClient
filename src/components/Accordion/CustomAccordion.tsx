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

const CustomAccordion = ({
  data,
  variant = "default",
}: {
  data: FAQItem[];
  variant?: "default" | "tasker";
}) => (
  <Accordion type="single" collapsible className="w-full space-y-4">
    {data.map((item, index) => (
      <AccordionItem
        key={index}
        value={`item-${index}`}
        className="border-2 border-neutral-800 rounded-2xl overflow-hidden bg-white shadow-sm data-[state=open]:border-primary transition-colors duration-300"
      >
        <AccordionTrigger className="px-4 sm:px-6 py-4 text-left hover:no-underline group">
          <span
            className={cn(
              "text-sm sm:text-base text-neutral-900 group-data-[state=open]:text-primary transition-colors duration-300",
              variant === "tasker" ? "font-bold" : "font-semibold"
            )}
          >
            {item.question}
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-4 sm:px-6 pb-4 text-sm sm:text-base text-neutral-700 leading-relaxed">
          {item.answer}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export default CustomAccordion;
