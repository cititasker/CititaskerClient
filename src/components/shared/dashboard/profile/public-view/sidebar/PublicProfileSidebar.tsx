"use client";

import { memo, useMemo } from "react";
import { useParams } from "next/navigation";
import { Award, User, Sparkles, LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useGetUserProfile } from "@/services/user/user.hook";
import { cn } from "@/lib/utils";

import { ProfileHeader } from "./components/ProfileHeader";
import { LocationAndRating } from "./components/LocationAndRating";
import { SkillsSection } from "./components/SkillsSection";
import { CertificationSection } from "./components/CertificationSection";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import { ErrorState } from "./components/ErrorState";
import { ROLE } from "@/constant";

interface SectionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  noBorder?: boolean;
}

const Section = memo(
  ({ title, icon: Icon, children, noBorder }: SectionProps) => (
    <div
      className={cn(
        "pt-6",
        noBorder ? "pb-0" : "border-b border-neutral-200 pb-6",
      )}
    >
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-primary" />
        <h3 className="text-base font-semibold text-text-primary">{title}</h3>
      </div>
      {children}
    </div>
  ),
);

Section.displayName = "Section";

const PublicProfileSidebar = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error, refetch } = useGetUserProfile({ id });

  const user = useMemo(() => data?.data, [data]);

  if (isLoading || !user) {
    return (
      <aside className="w-full md:max-w-[300px]">
        <LoadingSkeleton />
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="w-full md:max-w-[300px]">
        <ErrorState onRetry={refetch} />
      </aside>
    );
  }

  return (
    <aside className="w-full md:max-w-[300px]">
      <Card className="p-5 space-y-0 shadow-sm">
        <ProfileHeader user={user} />

        <Section title="Overview" icon={User}>
          <LocationAndRating user={user} />
        </Section>

        {user.role == ROLE.tasker && (
          <Section title="Skills" icon={Sparkles}>
            <SkillsSection skills={user.skills} />
          </Section>
        )}

        {user.role == ROLE.tasker && (
          <Section title="Achievements" icon={Award} noBorder>
            <CertificationSection user={user} />
          </Section>
        )}
      </Card>
    </aside>
  );
};

export default memo(PublicProfileSidebar);
