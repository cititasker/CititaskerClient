import React from "react";
import Link from "next/link";
import { ROLE, ROUTES } from "@/constant";
import { User, Plus } from "lucide-react";
import FormButton from "@/components/forms/FormButton";

interface GuestActionsProps {
  user: Partial<IUser>;
}

export function GuestActions({ user }: GuestActionsProps) {
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

      {(!user || user.role === ROLE.poster) && (
        <FormButton
          href={ROUTES.POST_TASK}
          text="Post a Task"
          icon={<Plus className="w-4 h-4" />}
          className="bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl"
        />
      )}
    </div>
  );
}
