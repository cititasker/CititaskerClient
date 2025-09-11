import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

export const CategorySearch = ({
  value,
  onChange,
  onClear,
}: {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}) => (
  <div className="relative mb-6 max-w-[400px]">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
    <Input
      type="text"
      placeholder="Search categories..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-10 pr-10 py-3 bg-background border border-border-light rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-500 outline-none transition-all"
    />
    {value && (
      <button
        onClick={onClear}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted hover:text-text-primary transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    )}
  </div>
);
