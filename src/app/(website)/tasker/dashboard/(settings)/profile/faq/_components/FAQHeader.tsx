import { ArrowDownUp } from "lucide-react";
import { FAQMode } from "../constants";

export const FAQHeader = ({
  mode,
  isRearranging,
}: {
  mode: FAQMode;
  isRearranging: boolean;
}) => {
  const getTitle = () => {
    switch (mode) {
      case "create":
        return "Add New FAQ";
      case "create-multiple":
        return "Add Multiple FAQs";
      default:
        return "Frequently Asked Questions";
    }
  };

  const getDescription = () => {
    switch (mode) {
      case "create":
        return "Create a new frequently asked question";
      case "create-multiple":
        return "Add multiple FAQs at once";
      default:
        return isRearranging
          ? "Drag and drop to reorder your FAQs"
          : "Manage your FAQ section to help customers find answers quickly";
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-text-primary">
          {getTitle()}
        </h2>
        <p className="text-sm text-text-muted mt-1">{getDescription()}</p>
      </div>

      {isRearranging && mode === "list" && (
        <div className="bg-info-light border border-info/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <ArrowDownUp className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-info mb-1">Reorder Mode Active</p>
              <p className="text-info/80">
                Drag FAQ items to rearrange their order, then click "Save Order"
                to apply changes.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
