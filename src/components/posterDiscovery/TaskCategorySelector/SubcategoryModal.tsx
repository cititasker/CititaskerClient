import FormButton from "@/components/forms/FormButton";
import CustomModal from "@/components/reusables/CustomModal";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface SubcategoryModalProps {
  category: ITaskCategory | null;
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (categoryId: number, subCategoryId?: number) => void;
  getIcon: (name: string) => React.ComponentType<{
    className?: string;
  }>;
  formatName: (name: string) => string;
}

export const SubcategoryModal = ({
  category,
  isOpen,
  onClose,
  onCreateTask,
  getIcon,
  formatName,
}: SubcategoryModalProps) => {
  const [selectedSubId, setSelectedSubId] = useState<number | null>(null);

  if (!category) return null;

  const hasSubcategories =
    category.subcategories && category.subcategories.length > 0;
  const Icon = getIcon(category.name);

  const handleCreateTask = () => {
    onCreateTask(category.id, selectedSubId || undefined);
    onClose();
    setSelectedSubId(null);
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={formatName(category.name)}
      description="Choose a specific service or create a general task"
      contentClassName="max-w-md"
      size="md"
      stickyHeader={true}
    >
      <div className="space-y-6">
        {/* Category header */}
        <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-lg">
          <Icon className="w-8 h-8 text-primary-600" />
          <div>
            <h3 className="font-semibold text-text-primary">
              {formatName(category.name)}
            </h3>
            <p className="text-sm text-text-secondary">
              {hasSubcategories
                ? `${category.subcategories.length} services available`
                : "General category"}
            </p>
          </div>
        </div>

        {/* Subcategories or general option */}
        <div className="space-y-3">
          {/* General task option */}
          <button
            onClick={() => setSelectedSubId(null)}
            className={cn(
              "w-full p-4 text-left rounded-lg border-2 transition-all duration-200",
              "flex items-center justify-between group",
              selectedSubId === null
                ? "border-primary-500 bg-primary-50"
                : "border-border-light hover:border-border-medium"
            )}
          >
            <div>
              <h4 className="font-medium text-text-primary">General Task</h4>
              <p className="text-sm text-text-secondary">
                Post a general {category.name.toLowerCase()} task
              </p>
            </div>
            <ChevronRight
              className={cn(
                "w-4 h-4 transition-colors",
                selectedSubId === null ? "text-primary-600" : "text-text-muted"
              )}
            />
          </button>

          {/* Subcategories */}
          {hasSubcategories && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-text-secondary px-2">
                Specific Services
              </h4>
              {category.subcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubId(sub.id)}
                  className={cn(
                    "w-full p-3 text-left rounded-lg border-2 transition-all duration-200",
                    "flex items-center justify-between group",
                    selectedSubId === sub.id
                      ? "border-primary-500 bg-primary-50"
                      : "border-border-light hover:border-border-medium"
                  )}
                >
                  <span className="font-medium text-text-primary">
                    {sub.name}
                  </span>
                  <ChevronRight
                    className={cn(
                      "w-4 h-4 transition-colors",
                      selectedSubId === sub.id
                        ? "text-primary-600"
                        : "text-text-muted"
                    )}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Create task button */}
        <FormButton
          text="Post Task"
          onClick={handleCreateTask}
          className="w-full btn-primary h-12"
        />
      </div>
    </CustomModal>
  );
};
