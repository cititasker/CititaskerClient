"use client";

import { Button } from "@/components/ui/button";
import { Edit, Share } from "lucide-react";
import Certifications from "./Certifications";
import ReviewSection from "./Reviews";
import Bio from "./Bio";
import Skills from "./Skills";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  id: any;
  data?: UserProfileData;
  isLoading?: boolean;
  onEdit?: () => void;
  canShare?: boolean;
}

export default function PublicProfile({
  id,
  data,
  isLoading,
  onEdit,
  canShare = true,
}: Props) {
  if (isLoading || !data) return <ProfileSkeleton />;
  // if (!data) return <EmptyState />;

  const profileData = {
    bio: data.about_me || "",
    skills: data.skills?.map((name: string) => ({ name })) || [],
    certifications: data.certifications || [],
    fullName: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${profileData.fullName}'s Profile`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch (err) {
      console.error("Share failed", err);
    }
  };

  return (
    <div className="space-y-6">
      {onEdit && (
        <div className="flex justify-end gap-3">
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>

          {canShare && (
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share className="w-4 h-4 mr-2" />
              Share Profile
            </Button>
          )}
        </div>
      )}

      <div className="space-y-10">
        <Bio bio={profileData.bio} />
        <Skills skills={profileData.skills} />
        <Certifications certificates={profileData.certifications} />
        <ReviewSection
          id={id}
          userName={profileData.fullName}
          maxPreview={3}
          userPublicData={data}
        />
      </div>
    </div>
  );
}

const ProfileSkeleton = () => (
  <div className="space-y-6">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="card-modern animate-pulse">
        <Skeleton className="h-4 w-20 mb-3" />
        <Skeleton className="h-24 w-full" />
      </div>
    ))}
  </div>
);

// const EmptyState = () => (
//   <div className="flex flex-col items-center p-6 text-center">
//     <User className="w-12 h-12 text-neutral-400 mb-4" />
//     <h3 className="font-medium">Profile Not Available</h3>
//     <p className="text-sm text-muted-foreground">
//       This profile couldn’t be loaded.
//     </p>
//   </div>
// );
