"use client";

import Image from "next/image";
import { useFormContext, Controller } from "react-hook-form";
import { IAdd, IUploadRemove } from "@/constant/icons";
import { convertToBase64 } from "@/utils";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ImageUploaderProps {
  name: string;
  label?: string;
  description?: string;
  multiple?: boolean;
  limit?: number;
  className?: string;
}

export default function ImageUploader({
  name,
  label,
  description,
  multiple = false,
  limit,
  className,
}: ImageUploaderProps) {
  const { control, getValues, setValue } = useFormContext();
  const maxFiles = multiple ? limit || Infinity : 1;

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    currentImages: any[],
    onChange: (val: any[]) => void
  ) => {
    const files = Array.from(e.target.files || []);
    const allowed = maxFiles - currentImages.length;
    const selected = files.slice(0, allowed);

    const newImages = await Promise.all(
      selected.map(async (file) => ({
        src: await convertToBase64(file),
        file,
        new: true,
      }))
    );
    // const result = [...newImages, ...currentImages].slice(-maxFiles);

    onChange([...newImages, ...currentImages].slice(0, maxFiles));
    e.target.value = ""; // reset input
  };

  const handleRemove = (
    index: number,
    currentImages: any[],
    onChange: (val: any[]) => void
  ) => {
    const updated = [...currentImages];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-2", className)}>
          {label && <FormLabel>{label}</FormLabel>}
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] items-center gap-4">
              {field.value?.length < maxFiles && (
                <div className="relative h-[120px] border border-dashed border-gray-300 rounded-md flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple={multiple}
                    onChange={(e) =>
                      handleUpload(e, field.value || [], field.onChange)
                    }
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <IAdd />
                </div>
              )}

              {field.value?.map((img: any, i: number) => (
                <div key={i} className="relative h-[120px]">
                  <Image
                    src={img.src}
                    alt={`uploaded-${i}`}
                    fill
                    className="object-cover rounded-md border border-dark-grey-1"
                  />
                  <button
                    type="button"
                    className="absolute top-0.5 right-0.5"
                    onClick={() => handleRemove(i, field.value, field.onChange)}
                  >
                    <IUploadRemove />
                  </button>
                </div>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
