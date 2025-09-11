import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQActions } from "./FAQActions";
import FAQForm from "../FAQForm";

interface FAQItemProps {
  faq: UserFaq;
  isEditing: boolean;
  isEdit: boolean;
  onEdit: () => void;
  onCopy: () => void;
  onDelete: () => void;
  onCancelEdit: () => void; // Add this prop for handling cancel
  onSuccessEdit: () => void;
}

export const FAQItem = ({
  faq,
  isEditing,
  isEdit,
  onEdit,
  onCopy,
  onDelete,
  onCancelEdit, // Receive the cancel callback
  onSuccessEdit,
}: FAQItemProps) => {
  if (isEditing) {
    const isDuplicate =
      typeof faq.id === "string" &&
      faq.id.startsWith("temp-") &&
      faq.question.includes("(Copy)");

    const mode = isDuplicate ? "duplicate" : "edit";
    return (
      <FAQForm
        mode={mode}
        existingFaq={faq}
        onCancel={onCancelEdit}
        onSuccess={onSuccessEdit}
      />
    );
  }

  return (
    <AccordionItem
      value={faq.id.toString()}
      className="border border-neutral-200 rounded-xl bg-background shadow-sm hover:shadow-md transition-all"
    >
      <div className="relative group">
        <AccordionTrigger className="px-4 sm:px-6 py-4 text-sm font-semibold text-text-primary hover:no-underline">
          <span className="text-left truncate">{faq.question}</span>
        </AccordionTrigger>

        {isEdit && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <FAQActions onEdit={onEdit} onCopy={onCopy} onDelete={onDelete} />
          </div>
        )}
      </div>

      <AccordionContent className="px-4 sm:px-6 pb-4 text-sm text-text-secondary leading-relaxed">
        <div className="pt-2 border-t border-neutral-100">{faq.answer}</div>
      </AccordionContent>
    </AccordionItem>
  );
};
