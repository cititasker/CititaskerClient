const SummaryItem = ({
  label,
  value,
  subLabel,
  isStrong = false,
  isNegative = false,
  icon,
  children,
}: {
  label: string;
  value: string | undefined;
  subLabel?: string;
  isStrong?: boolean;
  isNegative?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}) => (
  <div className="flex justify-between pb-3 mb-3 border-b-[0.6px] border-light-grey last:border-b-0">
    <div className="flex items-center gap-1">
      <div>
        <p
          className={`text-base ${
            isStrong ? "font-semibold" : "text-muted-foreground"
          }`}
        >
          {label}
        </p>
        {subLabel && (
          <p className="text-xs text-muted-foreground">{subLabel}</p>
        )}
      </div>
      {icon}
    </div>
    {children ?? (
      <p className={`text-base ${isStrong ? "font-semibold" : "text-black-2"}`}>
        {isNegative ? `- ${value}` : value}
      </p>
    )}
  </div>
);

export default SummaryItem;
