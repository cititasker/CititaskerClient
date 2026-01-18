import { ArrowDownUp } from "lucide-react";

export const RearrangeHelp = ({ show }: { show: boolean }) => {
  if (!show) return null;

  return (
    <div className="bg-info-light border border-info/20 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <ArrowDownUp className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          <p className="font-medium text-info mb-1">Reorder Mode Active</p>
          <p className="text-info/80">
            Drag and drop the FAQ items to rearrange their order. Click "Save
            Order" when you're done.
          </p>
        </div>
      </div>
    </div>
  );
};
