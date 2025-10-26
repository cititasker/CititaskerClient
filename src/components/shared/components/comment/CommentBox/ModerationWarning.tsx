// components/ModerationWarning.tsx
import React from "react";
import { AlertCircle, X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModerationWarningProps {
  violations: string[];
  warnings: string[];
  onDismiss?: () => void;
  className?: string;
}

export const ModerationWarning: React.FC<ModerationWarningProps> = ({
  violations,
  warnings,
  onDismiss,
  className,
}) => {
  const hasViolations = violations.length > 0;
  const hasWarnings = warnings.length > 0;

  if (!hasViolations && !hasWarnings) return null;

  return (
    <div className={cn("space-y-2", className)}>
      {/* Violations (Errors) */}
      {hasViolations && (
        <div className="bg-error/10 border border-error/30 rounded-lg p-3 animate-in fade-in slide-in-from-top-1">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-error mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-error">
                Content Violation
              </p>
              <ul className="list-disc list-inside text-xs text-error mt-1.5 space-y-1">
                {violations.map((violation, idx) => (
                  <li key={idx}>{violation}</li>
                ))}
              </ul>
            </div>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-error/70 hover:text-error transition-colors flex-shrink-0"
                type="button"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Warnings */}
      {hasWarnings && (
        <div className="bg-warning/10 border border-warning/30 rounded-lg p-3 animate-in fade-in slide-in-from-top-1">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-warning">
                Content Warning
              </p>
              <ul className="text-xs list-disc list-inside space-y-1 text-neutral-500 mt-1.5">
                {warnings.map((warning, idx) => (
                  <li key={idx}>{warning}</li>
                ))}
              </ul>
            </div>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-warning/70 hover:text-warning transition-colors flex-shrink-0"
                type="button"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
