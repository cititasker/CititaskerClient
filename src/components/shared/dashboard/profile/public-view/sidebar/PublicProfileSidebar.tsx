"use client";
import React from "react";
import { useGetUserProfile } from "@/services/user/user.hook";
import { useParams } from "next/navigation";
import { Award, User, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProfileHeader } from "./components/ProfileHeader";
import { LocationAndRating } from "./components/LocationAndRating";
import { SkillsSection } from "./components/SkillsSection";
import { BadgeSection } from "./components/BadgeSection";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import { ErrorState } from "./components/ErrorState";

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
