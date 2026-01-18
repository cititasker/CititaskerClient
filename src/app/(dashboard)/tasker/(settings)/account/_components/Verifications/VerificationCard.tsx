import { CustomStatusBadge } from "@/components/reusables/CustomStatusBadge";

const statuses = {
  verified: {
    status: "successful",
    label: "Verified",
  },
  unverified: {
    status: "pending",
    label: "Unverified",
  },
} as const;

const VerificationCard = ({
  icon,
  title,
  description,
  status,
  onClick,
  disabled = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: "verified" | "unverified";
  onClick: () => void;
  disabled?: boolean;
}) => (
  <div
    onClick={disabled ? undefined : () => onClick()}
    className="group cursor-pointer p-5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 hover:border-primary-200 transition-all duration-200 hover:shadow-md"
  >
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
      {/* Icon + Badge in row on mobile */}
      <div className="flex items-start gap-3 w-full sm:w-fit justify-between sm:justify-start">
        <div
          className={`p-3 rounded-xl transition-colors ${
            status === "verified"
              ? "bg-success-light text-success"
              : "bg-neutral-200 text-text-muted group-hover:bg-primary-100 group-hover:text-primary"
          }`}
        >
          {icon}
        </div>
        {/* Show status badge beside icon on small screens only */}
        <div className="sm:hidden">
          {/* <StatusBadge status={status} showDot /> */}
          <CustomStatusBadge
            status={statuses[status].status}
            label={statuses[status].label}
          />
        </div>
      </div>

      {/* Text content */}
      <div className="flex-1">
        <h3 className="font-semibold text-text-primary mb-1">{title}</h3>
        <p className="text-sm text-text-muted">{description}</p>
      </div>

      {/* Status badge on right for larger screens */}
      <div className="mt-2 sm:mt-0 sm:ml-auto hidden sm:block">
        <CustomStatusBadge
          status={statuses[status].status}
          label={statuses[status].label}
        />
      </div>
    </div>
  </div>
);

export default VerificationCard;
