"use client";
import React from "react";
import { useGetUserProfile } from "@/services/user/user.hook";
import { useParams } from "next/navigation";
import { Award, User, Sparkles, LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProfileHeader } from "./components/ProfileHeader";
import { LocationAndRating } from "./components/LocationAndRating";
import { SkillsSection } from "./components/SkillsSection";
import { BadgeSection } from "./components/BadgeSection";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import { ErrorState } from "./components/ErrorState";
import { useAuth } from "@/hooks/useAuth";
import { ROLE } from "@/constant";

interface SectionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  noBorder?: boolean;
}

const Section = ({ title, icon: Icon, children, noBorder }: SectionProps) => (
  <div className={`py-6 ${!noBorder ? "border-b border-neutral-200" : ""}`}>
    <div className="flex items-center gap-2 mb-4">
      <Icon className="w-5 h-5 text-primary" />
      <h3 className="text-base font-semibold text-text-primary">{title}</h3>
    </div>
    {children}
  </div>
);

const PublicProfileSidebar = () => {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useGetUserProfile({ id });
  const { role } = useAuth();

  const user = data?.data;
  const isTasker = role === ROLE.tasker;

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorState onRetry={refetch} />;

  return (
    <aside className="md:max-w-[300px] h-fit md:sticky md:top-6 md:self-start">
      <Card className="p-5 space-y-0">
        <ProfileHeader user={user} />

        <Section title="Overview" icon={User}>
          <LocationAndRating user={user} role={role} />
        </Section>

        {isTasker && (
          <>
            <Section title="Skills" icon={Sparkles}>
              <SkillsSection skills={user?.skills || []} />
            </Section>

            <Section title="Achievements" icon={Award} noBorder>
              <BadgeSection user={user} />
            </Section>
          </>
        )}
      </Card>
    </aside>
  );
};

export default PublicProfileSidebar;
