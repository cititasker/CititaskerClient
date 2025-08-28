"use client";

import React, { useEffect, useState } from "react";
import FormButton from "@/components/forms/FormButton";
import Icons from "@/components/Icons";
import Bio from "./Bio";
import ReviewSection from "./Reviews";
import { profileSummary } from "./mock";
import Certifications from "./Certifications";
import Skills from "./Skills";
import { useGetUserProfile } from "@/services/user/user.hook";
import PulseLoader from "@/components/reusables/loaders/PulseLoader";

interface Props {
  id: any;
  onEdit?: () => void;
  isEdit?: boolean;
  canShare?: boolean;
}

const Profile = ({ id, onEdit, isEdit, canShare = true }: Props) => {
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState<{ name: string }[]>([]);
  const [certifications, setCertifications] = useState<
    { institution: string; name: string; year: string }[]
  >([]);

  const { data, isPending, isLoading } = useGetUserProfile({ id });

  useEffect(() => {
    const user = data?.data;
    if (!user) return;

    setBio(user.about_me || "");
    setSkills(user.skills?.map((name: string) => ({ name })) || []);
    setCertifications(user.certifications || []);
  }, [data]);

  if (isLoading || isPending) return <PulseLoader />;

  return (
    <div>
      {isEdit && (
        <div className="flex justify-end items-center gap-4 mb-5">
          <FormButton
            variant="nude"
            className="text-primary px-0 py-0"
            onClick={onEdit}
            size="sm"
            icon={<Icons.edit />}
          >
            Edit profile
          </FormButton>
          {canShare && (
            <FormButton
              variant="nude"
              className="text-primary px-0 py-0"
              onClick={() => console.log("Share")}
              size="sm"
              icon={<Icons.share />}
            >
              Share profile
            </FormButton>
          )}
        </div>
      )}

      <div className="space-y-5 md:space-y-[50px]">
        <Bio bio={bio} />
        <Skills skills={skills} />
        <ReviewSection
          reviews={[]}
          profileSummary={profileSummary}
          maxPreview={3}
        />
        <Certifications certificates={certifications} />
      </div>
    </div>
  );
};

export default Profile;
