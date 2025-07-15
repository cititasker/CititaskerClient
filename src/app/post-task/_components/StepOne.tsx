"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
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
  const step = +(searchParams.get("step") || 1);
  const todo = searchParams.get("todo");

  const [categoryId, setCategoryId] = useState<number | null>(
    task.category_id?.id || null
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

  useEffect(() => {
    if (todo) {
      setValue("name", todo);
    }
  }, [todo]);

  useEffect(() => {
    const category = watch("category_id");
    if (category?.id !== categoryId) {
      setCategoryId(category?.id || null);
      setValue("sub_category_id", null);
    }
  }, [watch("category_id")]);

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    dispatch(setTaskData(data));
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("step", String(step + 1));
    // nextUrl.searchParams.set("d", "f");
    router.push(nextUrl.toString());
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 sm:gap-y-6 overflow-auto md:max-h-[600px] min-h-[65dvh] hide-scrollbar"
      >
        <FormInput
          name="name"
          label="What do you want to get done?"
          placeholder="Eg: AC Installation"
        />
        <FormTextArea
          name="description"
          label="Description"
          placeholder="Tell us more about the task you want to get done."
        />
        <div className="flex flex-col md:flex-row gap-4">
          <FormAutoComplete
            name="category_id"
            label="Industry"
            options={categories}
            getOptionLabel={(opt) => opt.name}
            isOptionEqualToValue={(a, b) => a?.id === b?.id}
          />
          <FormAutoComplete
            name="sub_category_id"
            label="Category"
            options={subCategories}
            getOptionLabel={(opt) => opt.name}
            isOptionEqualToValue={(a, b) => a?.id === b?.id}
            disabled={!categoryId}
          />
        </div>
        <ImageUploader name="images" />
        <PostTaskFormActions />
      </form>
    </FormProvider>
  );
}
