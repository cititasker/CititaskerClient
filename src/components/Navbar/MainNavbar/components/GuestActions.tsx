import React from "react";
import Link from "next/link";
import { ROUTES } from "@/constant";
import { User } from "lucide-react";
import FormButton from "@/components/forms/FormButton";

export function GuestActions() {
  return (
    <div className="flex items-center gap-3">
      <Link
        href={ROUTES.CREATE_ACCOUNT}
        className="hidden sm:block text-sm font-medium text-gray-600 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
      >
        Sign Up
      </Link>

      <FormButton
        text="Login"
        href={ROUTES.LOGIN}
        variant="default"
        size="lg"
        icon={<User className="w-4 h-4" />}
        className="bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
      />
    </div>
  );
}
