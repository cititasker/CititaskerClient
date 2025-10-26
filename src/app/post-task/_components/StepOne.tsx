"use client";
import { useState, useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { postTaskSchema } from "@/schema/task";
import { useCategoryOptions } from "@/hooks/useCategoryOptions";

import FormInput from "@/components/forms/FormInput";
import FormTextArea from "@/components/forms/FormTextArea";
import { FormAutoComplete } from "@/components/forms/FormAutoComplete";
import PostTaskFormActions from "./partials/PostTaskFormActions";
import ImageUploader from "../../../components/forms/uploader/ImageUploader";
import { useUrlParams } from "../hooks/useUrlParams";
import { useStepForm } from "../hooks/useStepForm";
import { toast } from "sonner";

export default function StepOne() {
  const urlParams = useUrlParams();
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const stepOneSchema = postTaskSchema.pick({
    name: true,
    description: true,
    category_id: true,
    sub_category_id: true,
    images: true,
  });

  const { methods, onSubmit } = useStepForm({
    schema: stepOneSchema,
    pickFields: [
      "name",
      "description",
      "category_id",
      "sub_category_id",
      "images",
    ],
  });

  const { setValue, watch, getValues } = methods;
  const { categories, subCategories } = useCategoryOptions(categoryId);

  // Handle URL parameters
  useEffect(() => {
    const updates: Record<string, any> = {};

    if (urlParams.todo && !getValues("name")) {
      updates.name = urlParams.todo;
    }

    if (urlParams.categoryId && categories.length > 0) {
      const selectedCategory = categories.find(
        (cat) => cat.id === urlParams.categoryId
      );
      if (selectedCategory) {
        updates.category_id = selectedCategory;
        setCategoryId(selectedCategory.id);
      }
    }

    Object.entries(updates).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [urlParams, categories, setValue, getValues]);

  // Handle subcategory from URL
  useEffect(() => {
    if (urlParams.subCategoryId && subCategories.length > 0) {
      const selectedSubCategory = subCategories.find(
        (sub) => sub.id === urlParams.subCategoryId
      );
      if (selectedSubCategory) {
        setValue("sub_category_id", selectedSubCategory);
      }
    }
  }, [urlParams.subCategoryId, subCategories, setValue]);

  // Handle category change
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "category_id") {
        const category = value.category_id;
        if (category?.id !== categoryId) {
          setCategoryId(category?.id || null);
          setValue("sub_category_id", null);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, categoryId]);

  const handleImageUploadComplete = (images: any[]) => {
    console.log("Images uploaded to Cloudinary:", images);
    // The images are already set in the form by the ImageUploader component
  };

  const handleImageUploadError = (error: any) => {
    toast.error(`Image upload failed: ${error.message}`);
  };

  return (
    <div className="space-y-6">
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className="space-y-6">
          <FormInput
            name="name"
            label="What do you want to get done?"
            placeholder="e.g., AC Installation, House Cleaning, Web Development"
            className="w-full"
          />

          <FormTextArea
            name="description"
            label="Task Description"
            placeholder="Provide details about your task, requirements, and any specific instructions..."
            className="w-full"
            rows={4}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormAutoComplete
              name="category_id"
              label="Industry"
              placeholder="Select an industry..."
              options={categories}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option?.id === value?.id}
            />

            <FormAutoComplete
              name="sub_category_id"
              label="Category"
              placeholder={
                categoryId ? "Select a category..." : "Select industry first"
              }
              options={subCategories}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option?.id === value?.id}
              disabled={!categoryId}
            />
          </div>

          <ImageUploader
            name="images"
            useCloudinary={true}
            folder="task-images"
            tags={["task", "user-upload"]}
            limit={3}
            maxFileSize={3} // 3MB max per file
            showFileDetails={true}
            transformations={{
              width: 800,
              height: 600,
              crop: "limit",
              quality: "auto",
              format: "auto",
            }}
            onUploadComplete={handleImageUploadComplete}
            onUploadError={handleImageUploadError}
            description="Upload images to help describe your task"
          />

          <PostTaskFormActions />
        </form>
      </FormProvider>
    </div>
  );
}
