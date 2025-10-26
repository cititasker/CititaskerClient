"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BiLoader } from "react-icons/bi";
import { Camera } from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile, uploadProfile } from "@/services/user/users.api";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { profileSchema, profileSchemaType, accountSchemaType } from "@/schema";
import { useAppSelector } from "@/store/hook";
import { errorHandler, extractPublicIdFromUrl, getMaxDate } from "@/utils";
import { defaultProfile } from "@/constant/images";

import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import FormDatePicker from "@/components/forms/FormDatePicker";
import FormButton from "@/components/forms/FormButton";
import { API_ROUTES } from "@/constant";
import { Button } from "@/components/ui/button";
import EditImageModal from "@/app/(website)/tasker/dashboard/(settings)/profile/portfolio/EditImageModal";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import { useCloudinaryDelete } from "@/hooks/useCloudinaryDelete";

const genderOptions = [
  { id: "male", name: "Male" },
  { id: "female", name: "Female" },
  { id: "other", name: "Other" },
  { id: "prefer-not-to-say", name: "Prefer not to say" },
];

const ProfileImageUpload = ({
  profileImage,
  onImageSelect,
  isUploading,
}: {
  profileImage: string;
  onImageSelect: (file: File) => void;
  isUploading: boolean;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onImageSelect(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      {/* Profile Image */}
      <div className="relative group">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-neutral-200 shadow-md">
          <Image
            src={profileImage || defaultProfile}
            alt="Profile"
            width={112}
            height={112}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-neutral-900/60 backdrop-blur-sm rounded-full transition-all duration-300 ${
            isUploading
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100 cursor-pointer"
          }`}
          onClick={!isUploading ? triggerFileSelect : undefined}
        >
          {isUploading ? (
            <BiLoader className="w-6 h-6 text-white animate-spin" />
          ) : (
            <Camera className="w-6 h-6 text-white" />
          )}
        </div>
      </div>

      {/* Upload Controls */}
      <div className="space-y-2">
        <div className="space-y-1">
          <h3 className="font-semibold text-text-primary">Profile Photo</h3>
          <p className="text-sm text-text-muted">
            Upload a clear photo of yourself
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={triggerFileSelect}
            disabled={isUploading}
            className="text-sm"
          >
            <Camera className="w-4 h-4 mr-2" />
            {profileImage ? "Change" : "Upload"}
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};

const FormSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-text-primary border-b border-neutral-200 pb-2">
      {title}
    </h3>
    {children}
  </div>
);

const FormGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
    {children}
  </div>
);

export default function Account() {
  const { user } = useAppSelector((state) => state.user);
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    file: File;
  } | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { uploadFile, isUploading: isCloudinaryUploading } =
    useCloudinaryUpload({
      folder: "user-profiles",
      onError: (error) => showSnackbar(error.message, "error"),
    });

  const { deleteImage, isDeleting: isCloudinaryDeleting } = useCloudinaryDelete(
    {
      // onError: (msg) => showSnackbar(msg, "error"),
    }
  );

  const profileUpload = useMutation({
    mutationFn: uploadProfile,
    onSuccess: (data) => {
      showSnackbar(data.message, "success");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.GET_USER_DETAILS],
      });
    },
    onError: (error) => showSnackbar(errorHandler(error), "error"),
  });

  const profileUpdate = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      showSnackbar(data.message, "success");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.GET_USER_DETAILS],
      });
    },
    onError: (error) => showSnackbar(errorHandler(error), "error"),
  });

  const methods = useForm<profileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      profile_image: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      gender: "",
      date_of_birth: "",
    },
  });

  const { handleSubmit, setValue, reset } = methods;

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      reset({
        profile_image: user.profile_image ?? "",
        first_name: user.first_name ?? "",
        last_name: user.last_name ?? "",
        email: user.email ?? "",
        phone_number: user.phone_number ?? "",
        gender: user.gender ?? "",
        date_of_birth: user.date_of_birth ?? "",
      });
    }
  }, [user, reset]);

  const handleImageSelect = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage({ src: imageUrl, file });
    setIsEditModalOpen(true);
  };

  const handleSaveEditedImage = async (editedImage: {
    src: string;
    file: File;
  }) => {
    try {
      const currentPublicId = extractPublicIdFromUrl(user?.profile_image);
      const deletePromise = currentPublicId
        ? deleteImage(currentPublicId).catch((e) => {
            console.error("Delete failed:", e);
          })
        : Promise.resolve();
      const uploadPromise = uploadFile(editedImage.file);

      const [_, result] = await Promise.all([deletePromise, uploadPromise]);

      if (result?.secure_url) {
        const formData = new FormData();
        formData.append("profile_image", result.secure_url);
        profileUpload.mutate(formData);
      }
      setIsEditModalOpen(false);
      setSelectedImage(null);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage.src);
      setSelectedImage(null);
    }
  };

  const onSubmit: SubmitHandler<accountSchemaType> = (values) => {
    const { profile_image, ...rest } = values;
    profileUpdate.mutate(rest);
  };

  const isLoading = profileUpdate.isPending || profileUpload.isPending;

  return (
    <>
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
            Account Settings
          </h1>
          <p className="text-text-muted">
            Manage your personal information and preferences
          </p>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Profile Image Section */}
            <FormSection title="Profile Photo">
              <ProfileImageUpload
                profileImage={user?.profile_image || ""}
                onImageSelect={handleImageSelect}
                isUploading={profileUpload.isPending}
              />
            </FormSection>

            {/* Personal Information */}
            <FormSection title="Personal Information">
              <div className="space-y-6">
                <FormGrid>
                  <FormInput
                    name="first_name"
                    label="First Name"
                    placeholder="Enter your first name"
                  />
                  <FormInput
                    name="last_name"
                    label="Last Name"
                    placeholder="Enter your last name"
                  />
                </FormGrid>

                <FormGrid>
                  <FormInput
                    name="email"
                    label="Email Address"
                    disabled
                    className="bg-neutral-50"
                  />
                  <FormInput
                    name="phone_number"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                  />
                </FormGrid>

                <FormGrid>
                  <FormDatePicker
                    name="date_of_birth"
                    label="Date of Birth"
                    maxDate={getMaxDate(18)}
                    placeholder="Select your birth date"
                  />
                  <FormSelect
                    name="gender"
                    label="Gender"
                    options={genderOptions}
                    placeholder="Select your gender"
                  />
                </FormGrid>
              </div>
            </FormSection>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-neutral-200">
              <FormButton
                type="submit"
                loading={isLoading}
                className="btn-primary px-8 py-3 min-w-[120px]"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </FormButton>
            </div>
          </form>
        </FormProvider>
      </div>

      {/* Edit Image Modal */}
      <EditImageModal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        selectedImage={selectedImage}
        onSaveImage={handleSaveEditedImage}
        cropShape="round"
        aspectRatio={1}
        title="Edit Profile Photo"
        description="Crop and position your profile photo perfectly"
        loading={isCloudinaryUploading || isCloudinaryDeleting}
      />
    </>
  );
}
