import React from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string | React.ReactNode;
  icon: React.ReactNode;
  onEdit?: () => void;
  canEdit?: boolean;
}

export default function InfoRow({
  label,
  value,
  icon,
  onEdit,
  canEdit = false,
}: Props) {
  return (
    <div
      className={cn("relative group rounded-lg transition-all duration-200")}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <div className="text-primary">{icon}</div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1">
            {label}
          </p>
          <div className="text-sm font-semibold text-text-primary">
            {typeof value === "string" ? (
              <span className="truncate block">{value}</span>
            ) : (
              value
            )}
          </div>
        </div>

        {canEdit && onEdit && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className={cn(
              "opacity-0 group-hover:opacity-100 transition-all duration-200",
              "text-primary hover:text-primary/80 hover:bg-primary/10",
              "h-8 px-2 text-xs"
            )}
          >
            <Edit className="w-3 h-3 mr-1" />
            Edit
          </Button>
        )}
      </div>
    </div>
  );
}
