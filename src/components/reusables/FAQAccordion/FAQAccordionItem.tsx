import { ChevronDown } from "lucide-react";

interface FAQAccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQAccordionItem = ({
  item,
  isOpen,
  onToggle,
}: FAQAccordionItemProps) => (
  <div
    className={`overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
      isOpen
        ? "border-primary bg-white shadow-lg"
        : "border-neutral-200 bg-white hover:border-neutral-300"
    }`}
  >
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between p-4 text-left sm:p-5"
    >
      <span
        className={`pr-4 text-base font-semibold transition-colors sm:text-lg ${
          isOpen ? "text-primary" : "text-neutral-900"
        }`}
      >
        {item.question}
      </span>
      <ChevronDown
        className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
          isOpen ? "rotate-180 text-primary" : "text-neutral-500"
        }`}
      />
    </button>

    <div
      className={`grid transition-all duration-300 ${
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden">
        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
          <div
            className="prose prose-sm max-w-none text-neutral-600 sm:prose-base"
            dangerouslySetInnerHTML={{ __html: item.answer }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default FAQAccordionItem;
