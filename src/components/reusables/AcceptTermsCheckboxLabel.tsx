import Link from "next/link";
import React from "react";

export default function AcceptTermsCheckboxLabel() {
  return (
    <p className="text-sm text-black-2">
      I accept the{" "}
      <Link href="#" className="text-primary text-sm">
        Terms & Conditions
      </Link>{" "}
      including{" "}
      <Link href="#" className="text-primary text-sm">
        Insurance
      </Link>
      .
    </p>
  );
}
