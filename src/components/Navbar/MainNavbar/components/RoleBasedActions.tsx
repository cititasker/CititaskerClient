// Updated RoleBasedActions.tsx
"use client";
import React from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES, ROLE } from "@/constant";

interface RoleBasedActionsProps {
  user: Partial<IUser> | undefined;
  isAuth: boolean;
}

export function RoleBasedActions({ user, isAuth }: RoleBasedActionsProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Post Task - Only for Posters */}
      {(!isAuth || user?.role === ROLE.poster) && (
        <Button asChild className="btn-primary shadow-glow-primary" size="lg">
          <Link href={ROUTES.POST_TASK} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Post Task</span>
          </Link>
        </Button>
      )}

      {/* Browse Tasks - Only for Taskers */}
      {(!isAuth || user?.role === ROLE.tasker) && (
        <Button
          asChild
          variant="outline"
          className="border-primary-200 text-primary-600 hover:bg-primary-50 hover:border-primary-400 transition-all duration-200"
          size="lg"
        >
          <Link href={ROUTES.BROWSE_TASK} className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span>Browse Tasks</span>
          </Link>
        </Button>
      )}
    </div>
  );
}
