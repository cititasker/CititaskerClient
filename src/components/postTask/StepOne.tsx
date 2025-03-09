"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../forms/FormInput";
import FormTextArea from "../forms/FormTextArea";
import FormAutoComplete from "../forms/FormAutoComplete";
import { postTaskSchema } from "@/schema/task";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCategories, getSubCategories } from "@/services";
import { capitalize, convertToBase64 } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setTaskData } from "@/store/slices/task";
import { useRouter, useSearchParams } from "next/navigation";
import PostTaskFormActions from "./PostTaskFormActions";
import { CATEGORY, SUB_CATEGORY } from "@/queries/queryKeys";

interface Category {
  id: number;
  name: string;
}

const schema = postTaskSchema.pick({
  name: true,
  description: true,
  category_id: true,
  sub_category_id: true,
  images: true,
});

type schemaType = z.infer<typeof schema>;

const StepOne = () => {
  const [id, setId] = useState<number | null>(null);
  const [categories, setCategories] = useState<ITaskCategory[]>([]);
  const [subCategories, setSubCategories] = useState<ITaskCategory[]>([]);
  const dispatch = useAppDispatch();
  const { task } = useAppSelector((state) => state.task);
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get("step") || 1;

  const categoryList = useQuery({
    queryKey: [CATEGORY],
    queryFn: getCategories,
  });

  const subCategoryList = useQuery<Category[]>({
    queryKey: SUB_CATEGORY(id),
    queryFn: () => getSubCategories(id),
    enabled: !!id,
  });

  const result: ITaskCategory[] = categoryList.data || [];
  const result2: ITaskCategory[] = subCategoryList.data || [];

  useEffect(() => {
    if (result.length && !categories.length) {
      const data = formatData(result);
      setCategories(data);
    }
    if (subCategoryList.data) {
      const data = formatData(result2);
      setSubCategories(data);
    }
  }, [result, result2]);

  const formatData = (data: ITaskCategory[]) => {
    return data.map((el) => ({ ...el, name: capitalize(el.name) }));
  };

  const methods = useForm<schemaType>({
    defaultValues: {
      name: task.name || "",
      description: task.description || "",
      category_id: task.category_id || null,
      sub_category_id: task.sub_category_id || null,
      images: [],
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, watch, getValues, setValue } = methods;

  const images = watch("images");

  useEffect(() => {
    if (task.category_id) {
      setId(task.category_id.id);
    }
    if (task.name) setValue("name", task.name);
    if (task.description) setValue("description", task.description);
    if (task.category_id) setValue("category_id", task.category_id);
    if (task.sub_category_id) setValue("sub_category_id", task.sub_category_id);
    if (task.images?.length) setValue("images", task.images);
  }, [task]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    const prev = getValues("images");
    if (files) {
      const fileArray = Array.from(files);
      const images = await Promise.all(
        fileArray.map(async (file) => {
          const base64 = await convertToBase64(file);
          return { src: base64, new: true };
        })
      );

      const uploaded = [...prev, ...images].slice(0, 4);
      setValue("images", uploaded);
    }
  };
  const handleRemoveImage = (index: number) => {
    const prev = [...getValues("images")];
    prev.splice(index, 1);
    setValue("images", prev);
  };

  const onSubmit: SubmitHandler<schemaType> = (values) => {
    dispatch(setTaskData(values));
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("step", `${+step + 1}`);
    currentUrl.searchParams.set("d", "f");
    push(`${currentUrl}`);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="hide-scrollbar min-h-[65dvh] max-h-[600px] overflow-auto flex flex-col"
      >
        <div className="flex-1">
          <div>
            <FormInput
              label="What do you want to get done?"
              name="name"
              type="text"
              placeholder="Eg: AC Installation"
              wrapperStyle="mb-6"
              inputstyle="px-[1.5rem]"
            />
            <FormTextArea
              name="description"
              label="Description"
              placeholder="Tell us more about the task you want to get done."
            />
            <div className="flex items-center gap-4">
              <FormAutoComplete
                label="Industry"
                options={categories}
                getOptionLabel={(option: any) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                name="category_id"
                placeholder="Select your industry"
                onChange={(_: any, data: Category | null) => {
                  setId(data?.id || null);
                }}
              />
              <FormAutoComplete
                label="Category"
                options={subCategories}
                getOptionLabel={(option: any) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                name="sub_category_id"
                disabled={!id || subCategoryList.isLoading}
                placeholder="Select a category"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Pictures{" "}
              <span className="text-dark-grey text-xs">(optional)</span>
            </label>
            <div className="flex items-center gap-4">
              {/* Uploaded Images Preview */}
              {images.length ? (
                <div className="flex  flex-wrap gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative w-20 h-20">
                      <Image
                        src={image.src}
                        alt={`Uploaded ${index}`}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0.5 right-0.5 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
              {images.length <= 3 && (
                <div className="relative w-20 h-20 border-dashed border-2 border-gray-300 rounded-md flex items-center justify-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <span className="text-gray-400 text-xl font-bold">+</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <PostTaskFormActions />
      </form>
    </FormProvider>
  );
};

export default StepOne;
