import { Button } from "@/components/ui/button";
import { ArrowDownUp, Plus, Save, X } from "@/components/icons/index";

export const ActionButtons = ({
  isRearranging,
  isEditing,
  onAddFAQ,
  onStartRearrange,
  onCancelRearrange,
  onSaveRearrange,
  isSaving,
}: {
  isRearranging: boolean;
  isEditing: boolean;
  onAddFAQ: () => void;
  onStartRearrange: () => void;
  onCancelRearrange: () => void;
  onSaveRearrange: () => void;
  isSaving: boolean;
}) => {
  if (isEditing) return null;

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center sm:justify-end mb-6">
      {isRearranging ? (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancelRearrange}
            disabled={isSaving}
            className="text-text-muted hover:text-text-primary"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={onSaveRearrange}
            disabled={isSaving}
            size="sm"
            className="btn-primary"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Order
          </Button>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onStartRearrange}
            className="hover:bg-neutral-50 order-2 sm:order-1"
          >
            <ArrowDownUp className="w-4 h-4 mr-2" />
            Reorder FAQs
          </Button>
          <Button
            onClick={onAddFAQ}
            size="sm"
            className="btn-primary order-1 sm:order-2"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add FAQ
          </Button>
        </div>
      )}
    </div>
  );
};
