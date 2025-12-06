import { Label } from "@/components/ui/label";

interface SummaryFieldProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

const SummaryField = ({ icon, label, value }: SummaryFieldProps) => (
  <div className="flex items-start gap-3 p-3 bg-background-secondary rounded-xl">
    <div className="text-primary mt-0.5">{icon}</div>
    <div className="flex-1 min-w-0">
      <Label className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1 block">
        {label}
      </Label>
      <div className="text-sm text-text-primary font-medium">
        {value || <span className="text-text-muted">Not specified</span>}
      </div>
    </div>
  </div>
);

export default SummaryField;
