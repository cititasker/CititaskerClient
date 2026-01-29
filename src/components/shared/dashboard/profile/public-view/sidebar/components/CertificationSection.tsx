"use client";

import Image from "next/image";
import { Award, Calendar, Building2 } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Badge1 from "@/../public/images/license1.jpg";

interface Certification {
  institution: string;
  name: string;
  year: string;
}

export const CertificationSection = ({ user }: { user: UserProfileData }) => {
  const certifications = user?.certifications || [];

  if (certifications.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Achievement Badges */}
      <div className="flex flex-wrap gap-3">
        {certifications.map((certification, index: number) => (
          <HoverCard key={index} openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <div className="relative group cursor-pointer hover:scale-105">
                <Image
                  src={Badge1}
                  alt={certification.name || "Achievement badge"}
                  width={48}
                  height={48}
                  className="rounded-lg shadow-sm transition-all duration-200"
                />
              </div>
            </HoverCardTrigger>

            <HoverCardContent
              side="top"
              align="center"
              className="w-80 p-4"
              sideOffset={8}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <h4 className="font-semibold text-neutral-900 text-sm leading-tight">
                    {certification.name}
                  </h4>
                  <div className="space-y-1">
                    <p className="text-neutral-600 text-xs flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="line-clamp-1">
                        {certification.institution}
                      </span>
                    </p>
                    <p className="text-neutral-500 text-xs flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Completed {certification.year}</span>
                    </p>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
};
