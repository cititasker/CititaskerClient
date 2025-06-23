import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const categoryOptions = [
  "Assembler & Installer",
  "Automobile",
  "Business",
  "Cleaning",
  "Event Planning",
];

const CategoryFilter = () => (
  <div className="flex flex-col gap-2 py-2">
    {categoryOptions.map((label, index) => (
      <div key={index} className="flex items-center gap-2">
        <Checkbox id={`cat-${index}`} />
        <Label htmlFor={`cat-${index}`} className="text-sm">
          {label}
        </Label>
      </div>
    ))}
  </div>
);

export default CategoryFilter;
