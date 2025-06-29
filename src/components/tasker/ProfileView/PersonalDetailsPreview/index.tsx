"use client";

import React from "react";
import FormButton from "@/components/forms/FormButton";
import Icons from "@/components/Icons";
import { FormSchema } from "../schema";
import Bio from "./Bio";
import ReviewSection from "./Reviews";
import { profileSummary } from "./mock";
import Certifications from "./Certifications";
import Skills from "./Skills";

interface Props {
  data: Pick<FormSchema, "bio" | "skills" | "certificates">;
  onEdit: () => void;
}

const PersonalDetailsPreview = ({ data, onEdit }: Props) => {
  const { bio, skills, certificates } = data;

  return (
    <div>
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
        <FormButton
          variant="nude"
          className="text-primary px-0 py-0"
          onClick={() => console.log("Share")}
          size="sm"
          icon={<Icons.share />}
        >
          Share profile
        </FormButton>
      </div>

      <div className="space-y-[50px]">
        <Bio bio={bio} />
        <Skills skills={skills} />
        <ReviewSection
          reviews={[]}
          profileSummary={profileSummary}
          maxPreview={3}
        />
        <Certifications certificates={certificates} />
      </div>
    </div>
  );
};

export default PersonalDetailsPreview;
