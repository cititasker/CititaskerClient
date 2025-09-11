import { HelpCircle } from "lucide-react";

export const EmptyFAQState = () => (
  <div className="text-center py-12">
    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <HelpCircle className="w-8 h-8 text-neutral-400" />
    </div>
    <h3 className="text-lg font-semibold text-text-primary mb-2">
      No FAQs yet
    </h3>
    <p className="text-text-muted max-w-sm mx-auto">
      Create frequently asked questions to help customers understand your
      services better.
    </p>
  </div>
);
