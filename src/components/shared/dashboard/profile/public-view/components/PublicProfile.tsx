"use client";

import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Share, User } from "lucide-react";
import { useGetUserProfile } from "@/services/user/user.hook";
import Certifications from "./Certifications";
import { Skeleton } from "@/components/ui/skeleton";
import ReviewSection from "./Reviews";
import Bio from "./Bio";
import Skills from "./Skills";
import { ProfileData } from "../../types/profile";

interface ProfileProps {
  id: string | number;
  data?: ProfileData;
  onEdit?: () => void;
  isEdit?: boolean;
  canShare?: boolean;
}

const ProfileSkeleton = () => (
  <div className="space-y-6">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="card-modern animate-pulse">
        <Skeleton className="h-4 w-20 mb-3" />
        <Skeleton className="h-24 w-full" />
      </div>
    ))}
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center p-4 text-center">
    <User className="w-12 h-12 text-neutral-400 mb-4" />
    <h3 className="text-text-primary font-medium mb-2">
      Profile Not Available
    </h3>
    <p className="text-text-muted text-sm">
      This profile couldn't be loaded at the moment.
    </p>
  </div>
);

const ActionButtons = ({
  onEdit,
  onShare,
  canShare,
}: {
  onEdit?: () => void;
  onShare: () => void;
  canShare: boolean;
}) => (
  <div className="flex flex-wrap gap-3 justify-end mb-6">
    {onEdit && (
      <Button
        variant="ghost"
        size="sm"
        onClick={onEdit}
        className="text-primary hover:text-primary-600 hover:bg-primary-50"
      >
        <Edit className="w-4 h-4 mr-2" />
        Edit Profile
      </Button>
    )}
    {canShare && (
      <Button
        variant="ghost"
        size="sm"
        onClick={onShare}
        className="text-primary hover:text-primary-600 hover:bg-primary-50"
      >
        <Share className="w-4 h-4 mr-2" />
        Share Profile
      </Button>
    )}
  </div>
);

const PublicProfile = ({
  id,
  data: propData,
  onEdit,
  isEdit,
  canShare = true,
}: ProfileProps) => {
  const { data: fetchedData, isLoading, error } = useGetUserProfile({ id });

  const profileData = useMemo(() => {
    const rawData = propData || fetchedData?.data;
    if (!rawData) return null;

    return {
      bio: rawData.about_me || "",
      skills: rawData.skills?.map((name: string) => ({ name })) || [],
      certifications: rawData.certifications || [],
      fullName: `${rawData.first_name || ""} ${rawData.last_name || ""}`.trim(),
    };
  }, [propData, fetchedData]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${profileData?.fullName}'s Profile`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // Add toast notification here if available
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  if (isLoading) return <ProfileSkeleton />;
  if (error || !profileData) return <EmptyState />;

  return (
    <div className="space-y-6">
      {isEdit && (
        <ActionButtons
          onEdit={onEdit}
          onShare={handleShare}
          canShare={canShare}
        />
      )}

      <div className="space-y-6">
        <Bio bio={profileData.bio} />
        <Skills skills={profileData.skills} />
        <Certifications certificates={profileData.certifications} />
        <ReviewSection
          reviews={[]}
          userName={profileData.fullName}
          maxPreview={3}
        />
      </div>
    </div>
  );
};

export default PublicProfile;
