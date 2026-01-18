import React, {
  ReactNode,
  ReactElement,
  isValidElement,
  cloneElement,
} from "react";
import { CircleSlash } from "lucide-react";

interface EmptyCommentProps {
  icon?: ReactNode;
  title?: string;
  message?: string;
  className?: string;
  iconWrapperClassName?: string;
  iconClassName?: string;
  children?: ReactNode;
}

export default function EmptyState({
  icon = <CircleSlash className="w-8 h-8 text-neutral-400" />,
  title = "No questions yet",
  message,
  className = "",
  iconWrapperClassName = "",
  iconClassName = "",
  children,
}: EmptyCommentProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div
        className={`w-16 h-16 mx-auto mb-4 bg-neutral-100 rounded-full flex items-center justify-center ${iconWrapperClassName}`}
      >
        {isValidElement(icon)
          ? cloneElement(icon as ReactElement<{ className?: string }>, {
              className: `${
                (icon.props as { className?: string }).className ?? ""
              } ${iconClassName}`,
            })
          : icon}
      </div>
      <h3 className="font-medium text-text-secondary mb-2">{title}</h3>
      {message && <p className="text-sm text-text-muted">{message}</p>}
      {children}
    </div>
  );
}
