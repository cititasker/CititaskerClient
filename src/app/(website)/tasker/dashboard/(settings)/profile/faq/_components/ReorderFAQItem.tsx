import { GripVertical } from "lucide-react";

export const ReorderFAQItem = ({ faq }: { faq: UserFaq }) => (
  <div className="border border-neutral-200 rounded-xl bg-background shadow-sm hover:shadow-md transition-all p-4 sm:p-6">
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 text-neutral-400 hover:text-neutral-600 cursor-grab">
        <GripVertical className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-text-primary mb-2 line-clamp-2">
          {faq.question}
        </h3>
        <p className="text-sm text-text-secondary line-clamp-3">{faq.answer}</p>
      </div>
    </div>
  </div>
);
