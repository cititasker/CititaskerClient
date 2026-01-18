export const StatCard = ({
  icon,
  label,
  value,
  subValue,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | React.ReactNode;
  subValue?: string;
}) => (
  <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-200 hover:border-neutral-300 transition-colors">
    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs font-medium text-text-muted uppercase tracking-wide">
        {label}
      </p>
      <div className="text-sm font-semibold text-text-primary truncate">
        {value}
      </div>
      {subValue && <p className="text-xs text-text-muted">{subValue}</p>}
    </div>
  </div>
);
