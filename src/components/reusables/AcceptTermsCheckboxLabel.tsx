import Link from "next/link";
import { memo } from "react";

const AcceptTermsCheckboxLabel = () => {
  return (
    <span className="text-sm text-text-primary leading-relaxed">
      I accept the{" "}
      <Link
        href="/legal/terms-and-conditions"
        className="text-primary hover:text-primary-600 underline underline-offset-2 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        Terms & Conditions
      </Link>
    </span>
  );
};

AcceptTermsCheckboxLabel.displayName = "AcceptTermsCheckboxLabel";

export default memo(AcceptTermsCheckboxLabel);
