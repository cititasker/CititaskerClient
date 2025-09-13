"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postTaskSchema } from "@/schema/task";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setTaskData } from "@/store/slices/task";

import FormInput from "@/components/forms/FormInput";
import FormTextArea from "@/components/forms/FormTextArea";
import { FormAutoComplete } from "@/components/forms/FormAutoComplete";
import PostTaskFormActions from "./PostTaskFormActions";
import { useCategoryOptions } from "@/hooks/useCategoryOptions";
import ImageUploader from "./ImageUploader";

const schema = postTaskSchema.pick({
  name: true,
  description: true,
  category_id: true,
  sub_category_id: true,
  images: true,
});

type SchemaType = z.infer<typeof schema>;

export default function StepOne() {
  const { task } = useAppSelector((s) => s.task);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlParams = useMemo(
    () => ({
      step: Number(searchParams.get("step")) || 1,
      todo: searchParams.get("todo"),
      categoryId: searchParams.get("category_id")
        ? Number(searchParams.get("category_id"))
        : null,
      subCategoryId: searchParams.get("sub_category_id")
        ? Number(searchParams.get("sub_category_id"))
        : null,
    }),
    [searchParams]
  );

  const [categoryId, setCategoryId] = useState<number | null>(
    task.category_id?.id || urlParams.categoryId || null
  );

  const { categories, subCategories } = useCategoryOptions(categoryId);

  const methods = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: task.name || "",
      description: task.description || "",
      category_id: task.category_id || null,
      sub_category_id: task.sub_category_id || null,
      images: task.images || [],
    },
  });

  const { handleSubmit, setValue, watch } = methods;

  // Handle URL parameter initialization
  useEffect(() => {
    const updates: Partial<SchemaType> = {};

    if (urlParams.todo && !task.name) {
      updates.name = urlParams.todo;
    }

    if (urlParams.categoryId && categories.length > 0 && !task.category_id) {
      const selectedCategory = categories.find(
        (cat) => cat.id === urlParams.categoryId
      );
      if (selectedCategory) {
        updates.category_id = selectedCategory;
        setCategoryId(selectedCategory.id);
      }
    }

    if (Object.keys(updates).length > 0) {
      Object.entries(updates).forEach(([key, value]) => {
        setValue(key as keyof SchemaType, value);
      });
    }
  }, [
    urlParams.todo,
    urlParams.categoryId,
    categories,
    setValue,
    task.name,
    task.category_id,
  ]);

  // Handle subcategory from URL
  useEffect(() => {
    if (
      urlParams.subCategoryId &&
      subCategories.length > 0 &&
      !task.sub_category_id
    ) {
      const selectedSubCategory = subCategories.find(
        (sub) => sub.id === urlParams.subCategoryId
      );
      if (selectedSubCategory) {
        setValue("sub_category_id", selectedSubCategory);
      }
    }
  }, [urlParams.subCategoryId, subCategories, setValue, task.sub_category_id]);

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

  const onSubmit = (data: SchemaType) => {
    dispatch(setTaskData(data));
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("step", String(urlParams.step + 1));
    router.push(nextUrl.toString());
  };

  return (
    <div className="space-y-6">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Task Name */}
          <FormInput
            name="name"
            label="What do you want to get done?"
            placeholder="e.g., AC Installation, House Cleaning, Web Development"
            className="w-full"
          />

          {/* Description */}
          <FormTextArea
            name="description"
            label="Task Description"
            placeholder="Provide details about your task, requirements, and any specific instructions..."
            className="w-full"
            rows={4}
          />

          {/* Category Selection */}
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

          {/* Image Upload */}
          <ImageUploader name="images" />

          <PostTaskFormActions />
        </form>
      </FormProvider>
    </div>
  );
}
