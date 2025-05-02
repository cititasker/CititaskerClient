"use client";
import React, { useState } from "react";
import FormButton from "../forms/FormButton";
import FormTextEditor from "../reusables/FormTextEditor";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import FormError from "../reusables/FormError";
import Icons from "../Icons";
import RatingSection from "./RatingSection";

const schema = z.object({
  bio: z.string().min(1, { message: "Please enter some text" }),
});
type schemaType = z.infer<typeof schema>;

type Certificate = {
  intitution: string;
  year: string;
};

const PersonalDetails = () => {
  const [edit, setEdit] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [addedSkills, setAddedSkills] = useState<string[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  const methods = useForm<schemaType>({
    defaultValues: { bio: "" },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, control, watch } = methods;
  const bio = watch("bio");

  const toggleEdit = () => setEdit((prev) => !prev);

  const onSubmit = (values: schemaType) => {
    console.log("Bio:", values.bio);
    console.log("Skills:", addedSkills);
    console.log("Certificates:", certificates);
    toggleEdit();
  };

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !addedSkills.includes(trimmed)) {
      setAddedSkills((prev) => [...prev, trimmed]);
    }
    setSkillInput("");
  };

  const handleRemoveSkill = (skill: string) => {
    setAddedSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleAddCertificateField = () => {
    setCertificates((prev) => [...prev, { intitution: "", year: "" }]);
  };

  const handleCertificateChange = (
    index: number,
    field: keyof Certificate,
    value: string
  ) => {
    const updated = [...certificates];
    updated[index][field] = value;
    setCertificates(updated);
  };

  return (
    <div>
      {!edit && (
        <div className="flex items-center justify-end px-10 gap-4 mb-5">
          <FormButton
            btnStyle="p-0 bg-transparent text-primary hover:bg-transparent shadow-none"
            handleClick={toggleEdit}
          >
            <Icons.edit className="w-4 h-4" />
            Edit profile
          </FormButton>

          <FormButton
            btnStyle="p-0 bg-transparent text-primary hover:bg-transparent shadow-none"
            handleClick={toggleEdit}
          >
            <Icons.share className="w-4 h-4 text-primary" />
            Share profile
          </FormButton>
        </div>
      )}

      {edit ? (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="max-w-[653px] px-8 space-y-6">
              {/* Bio */}
              <label className="font-semibold">About me</label>
              <Controller
                control={control}
                name="bio"
                render={({ field }) => (
                  <div>
                    <FormTextEditor
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormError name="bio" />
                  </div>
                )}
              />

              <div className="border-t"></div>

              {/* Skills */}
              <div className="space-y-2 pt-4">
                <label className="font-semibold">Skills</label>
                <div className="border p-2 rounded-lg flex items-center gap-2 flex-wrap bg-[#f3f5f6]">
                  <input
                    type="text"
                    className="flex-grow outline-none text-sm bg-transparent text-black"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                  />
                  <FormButton
                    type="button"
                    text="Add"
                    btnStyle="px-6 !h-[32px] !bg-white !text-primary"
                    handleClick={handleAddSkill}
                  />
                </div>

                {addedSkills.length > 0 && (
                  <div className="border p-3 rounded-lg flex flex-wrap gap-2 bg-[#f3f5f6]">
                    {addedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-white px-3 py-2 text-sm rounded-full flex items-center gap-1"
                      >
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                        >
                          ✕
                        </button>
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t"></div>

              {/* Certifications */}
              <div className="space-y-4 pt-4">
                <label className="font-semibold">Certifications</label>
                {certificates.map((cert, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <Image
                      src="/images/Certificate.svg"
                      alt="certificate"
                      width={60}
                      height={60}
                    />
                    <div className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium block">
                          Awarded by:
                        </label>
                        <input
                          type="text"
                          value={cert.intitution}
                          onChange={(e) =>
                            handleCertificateChange(
                              index,
                              "intitution",
                              e.target.value
                            )
                          }
                          className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-0"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium block">
                          Year:
                        </label>
                        <input
                          type="text"
                          value={cert.year}
                          onChange={(e) =>
                            handleCertificateChange(
                              index,
                              "year",
                              e.target.value
                            )
                          }
                          className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-0"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <FormButton
                  type="button"
                  btnStyle="!bg-white !text-primary px-4 !h-[36px]"
                  handleClick={handleAddCertificateField}
                >
                  <Icons.plus />
                  Add Certificate
                </FormButton>
              </div>

              <div className="border-t"></div>

              {/* Submit */}
              <div className="flex gap-6 pt-4">
                <FormButton
                  type="submit"
                  text="Cancel"
                  btnStyle="mt-5 max-w-[318px] w-full !bg-[#f3f5f6] !text-primary"
                />
                <FormButton
                  type="submit"
                  text="Save"
                  btnStyle="mt-5 max-w-[318px] w-full"
                />
              </div>
            </div>
          </form>
        </FormProvider>
      ) : (
        <div className=" px-8 space-y-6 ">
          <div className="max-w-[740px]">
            <div dangerouslySetInnerHTML={{ __html: bio }} />
          </div>

          {addedSkills.length > 0 && (
            <div className="max-w-[740px]">
              <p className="text-sm font-bold mb-1">Skills:</p>
              <div className="flex flex-wrap gap-2">
                {addedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-200 text-gray-800 px-3 py-1 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {!edit && bio && (
            <div className="py-10">
              <RatingSection />
            </div>
          )}

          {certificates.length > 0 && (
            <div className="max-w-[740px]">
              <p className="text-sm font-bold mb-1">Certifications:</p>
              <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                {certificates.map((cert, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <Image
                      src="/images/Certificate.svg"
                      alt="certificate"
                      width={40}
                      height={40}
                    />
                    <div className="text-sm">
                      <p className="font-medium">{cert.intitution}</p>
                      <p>Graduated {cert.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonalDetails;
