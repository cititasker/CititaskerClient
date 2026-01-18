// UserProfile.tsx - Clean and responsive
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/store/hook";
import { defaultProfile } from "@/constant/images";
import { initializeName } from "@/utils";
import { cn } from "@/lib/utils";

interface UserProfileProps {
  className?: string;
  compact?: boolean;
}

const UserProfile = ({ className, compact = false }: UserProfileProps) => {
  const { user } = useAppSelector((state) => state.user);

  const displayName =
    initializeName({
      first_name: user.first_name,
      last_name: user.last_name,
    }) || "Anonymous";

  const profilePath = user?.id ? `/${user.role}-profile/${user.id}` : "#";

  return (
    <div
      className={cn(
        "flex flex-col items-center p-6 border-b border-border-light",
        compact && "py-4",
        className
      )}
    >
      <div className="relative group">
        <Image
          src={user.profile_image || defaultProfile}
          alt={`${displayName} profile`}
          width={compact ? 60 : 80}
          height={compact ? 60 : 80}
          className={cn(
            "rounded-full object-cover ring-2 ring-background-secondary transition-all duration-200 group-hover:ring-primary/20",
            compact ? "w-15 h-15" : "w-20 h-20"
          )}
        />

        {/* Online indicator */}
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
      </div>

      <div className="mt-3 text-center space-y-1">
        <Link
          href={profilePath}
          className="block font-semibold text-text-primary hover:text-primary transition-colors capitalize text-sm"
        >
          {displayName}
        </Link>

        {!compact && (
          <p className="text-xs text-text-muted capitalize">
            {user.role || "User"}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
