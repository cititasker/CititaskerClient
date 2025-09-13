import { cn } from "@/lib/utils";

// Category card
interface CategoryCardProps {
  category: ITaskCategory;
  onClick: () => void;
  getIcon: (name: string) => React.ComponentType<{
    className?: string;
  }>;
  formatName: (name: string) => string;
}

export const CategoryCard = ({
  category,
  onClick,
  getIcon,
  formatName,
}: CategoryCardProps) => {
  const Icon = getIcon(category.name);

  return (
    <button
      onClick={onClick}
      className={cn(
        "group aspect-square p-4 rounded-xl transition-all duration-200 border",
        "flex flex-col items-center justify-center text-center",
        "bg-background border-border-light hover:border-primary-300 hover:shadow-lg hover:scale-[1.02]",
        "active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary-400"
      )}
    >
      <Icon className="w-8 h-8 mb-3 text-text-secondary group-hover:text-primary-600 transition-colors" />
      <span className="text-sm font-medium text-text-primary leading-tight">
        {formatName(category.name)}
      </span>

      {/* Subcategory indicator */}
      {category.subcategories?.length > 0 && (
        <div className="mt-2 px-2 py-1 bg-primary-100 text-primary-600 rounded-full text-xs font-medium">
          {category.subcategories.length} options
        </div>
      )}
    </button>
  );
};
