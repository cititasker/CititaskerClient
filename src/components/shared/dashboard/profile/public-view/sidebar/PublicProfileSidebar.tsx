"use client";
import { defaultProfile } from "@/constant/images";
import { initializeName } from "@/utils";
import Image from "next/image";
import React, { useState } from "react";
import Badge1 from "@/../public/images/license1.jpg";
import { IDistance, IShieldTick } from "@/constant/icons";
import Rating from "@/components/reusables/Rating";
import { useGetUserProfile } from "@/services/user/user.hook";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Star,
  Award,
  RefreshCw,
  User,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const ProfileHeader = ({ user }: { user: any }) => (
  <div className="p-6 border-b border-neutral-200 bg-gradient-to-br from-primary-50 to-background">
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-4 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <Image
          src={user?.profile_image || defaultProfile}
          alt={`${user?.first_name || "User"}'s profile`}
          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-top ring-2 ring-background shadow-lg"
          width={200}
          height={200}
        />
        {user?.is_verified && (
          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-success rounded-full flex items-center justify-center shadow-lg">
            <IShieldTick className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h2 className="text-lg sm:text-xl font-semibold text-text-primary">
          {initializeName({
            first_name: user?.first_name,
            last_name: user?.last_name,
          }) || "Anonymous User"}
        </h2>

        {user?.job_title && (
          <p className="text-sm text-text-muted font-medium bg-neutral-100 px-3 py-1 rounded-full">
            {user.job_title}
          </p>
        )}
      </div>
    </div>
  </div>
);

const StatCard = ({
  icon,
  label,
  value,
  subValue,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | React.ReactNode;
  subValue?: string;
}) => (
  <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-200 hover:border-neutral-300 transition-colors">
    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs font-medium text-text-muted uppercase tracking-wide">
        {label}
      </p>
      <p className="text-sm font-semibold text-text-primary truncate">
        {value}
      </p>
      {subValue && <p className="text-xs text-text-muted">{subValue}</p>}
    </div>
  </div>
);

const LocationAndRating = ({ user }: { user: any }) => {
  const reviewCount = user?.review_count || 0;
  const rating = user?.average_rating || 0;

  return (
    <div className="grid grid-cols-1 gap-3">
      <StatCard
        icon={<MapPin className="w-4 h-4 text-primary" />}
        label="Location"
        value={user?.location || "Location not specified"}
      />

      <StatCard
        icon={<Star className="w-4 h-4 text-warning" />}
        label="Rating"
        value={
          <div className="flex items-center gap-2">
            <Rating value={rating} readOnly size={16} />
            <span className="font-bold">
              {rating > 0 ? rating.toFixed(1) : "0.0"}
            </span>
          </div>
        }
        subValue={`${reviewCount} review${reviewCount !== 1 ? "s" : ""}`}
      />
    </div>
  );
};

const SkillsSection = ({ skills }: { skills: string[] }) => {
  const [showAll, setShowAll] = useState(false);
  const displayLimit = 6;
  const hasMoreSkills = skills?.length > displayLimit;
  const displayedSkills = showAll ? skills : skills?.slice(0, displayLimit);

  if (!skills?.length) {
    return (
      <div className="text-center py-6">
        <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Sparkles className="w-6 h-6 text-neutral-400" />
        </div>
        <p className="text-sm text-text-muted">No skills added yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {displayedSkills.map((skill, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="px-3 py-1.5 bg-gradient-to-r from-primary-50 to-secondary-50 text-text-primary text-xs font-medium rounded-full border border-primary-200 hover:from-primary-100 hover:to-secondary-100 transition-all duration-200"
          >
            {skill}
          </Badge>
        ))}
      </div>

      {hasMoreSkills && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAll(!showAll)}
          className="w-full text-primary hover:text-primary-600 hover:bg-primary-50"
        >
          {showAll ? (
            <>
              <ChevronUp className="w-4 h-4 mr-2" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-2" />
              Show {skills.length - displayLimit} More
            </>
          )}
        </Button>
      )}
    </div>
  );
};

const BadgeSection = ({ user }: { user: any }) => {
  const badges = user?.badges || [];
  const completedJobs = user?.completed_jobs || 0;
  const yearsOfExperience = user?.years_of_experience || 0;

  return (
    <div className="space-y-4">
      {/* Achievement Badges */}
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {badges.map((badge: any, index: number) => (
            <div key={index} className="relative group">
              <Image
                src={badge.image || Badge1}
                alt={badge.name || "Achievement badge"}
                width={48}
                height={48}
                className="rounded-lg shadow-sm group-hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {completedJobs > 0 && (
          <div className="text-center p-3 bg-success-light rounded-lg border border-success/20">
            <p className="text-lg font-bold text-success">{completedJobs}</p>
            <p className="text-xs text-success/80">Jobs Done</p>
          </div>
        )}

        {yearsOfExperience > 0 && (
          <div className="text-center p-3 bg-primary-50 rounded-lg border border-primary/20">
            <p className="text-lg font-bold text-primary">
              {yearsOfExperience}+
            </p>
            <p className="text-xs text-primary/80">Years Exp</p>
          </div>
        )}
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <aside className="card-modern md:max-w-[300px] h-fit">
    <div className="animate-pulse">
      {/* Header Skeleton */}
      <div className="p-6 border-b border-neutral-200">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-neutral-200 rounded-full mb-4"></div>
          <div className="h-5 bg-neutral-200 rounded w-32 mb-2"></div>
          <div className="h-3 bg-neutral-200 rounded w-24"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="p-6 border-b border-neutral-200 space-y-3">
          <div className="h-4 bg-neutral-200 rounded w-20"></div>
          <div className="space-y-2">
            <div className="h-3 bg-neutral-200 rounded w-full"></div>
            <div className="h-3 bg-neutral-200 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  </aside>
);

const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <aside className="card-modern md:max-w-[300px] h-fit">
    <div className="p-6 text-center space-y-4">
      <div className="w-12 h-12 bg-error-light rounded-full flex items-center justify-center mx-auto">
        <User className="w-6 h-6 text-error" />
      </div>
      <div>
        <h3 className="font-medium text-text-primary mb-1">
          Failed to load profile
        </h3>
        <p className="text-sm text-text-muted">
          Unable to fetch profile information
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onRetry}
        className="hover:bg-primary-50 hover:border-primary hover:text-primary"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Try Again
      </Button>
    </div>
  </aside>
);

const SectionHeader = ({
  title,
  icon,
}: {
  title: string;
  icon?: React.ReactNode;
}) => (
  <div className="flex items-center gap-2 mb-4">
    {icon && <div className="w-5 h-5 text-primary">{icon}</div>}
    <h3 className="text-base font-semibold text-text-primary">{title}</h3>
  </div>
);

const PublicProfileSidebar = () => {
  const params = useParams();
  const id = params.id;
  const { data, isLoading, error, refetch } = useGetUserProfile({ id });
  const user = data?.data;

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorState onRetry={refetch} />;
  }

  return (
    <aside className=" md:max-w-[300px] h-fit md:sticky md:top-6 md:self-start overflow-hidden">
      <Card className="p-5">
        <ProfileHeader user={user} />

        <div className="py-6 border-b border-neutral-200">
          <SectionHeader title="Overview" icon={<User className="w-5 h-5" />} />
          <LocationAndRating user={user} />
        </div>

        <div className="py-6 border-b border-neutral-200">
          <SectionHeader
            title="Skills"
            icon={<Sparkles className="w-5 h-5" />}
          />
          <SkillsSection skills={user?.skills || []} />
        </div>

        <div className="py-6">
          <SectionHeader
            title="Achievements"
            icon={<Award className="w-5 h-5" />}
          />
          <BadgeSection user={user} />
        </div>
      </Card>
    </aside>
  );
};

export default PublicProfileSidebar;
