"use client";

import Image from "next/image";
import { convertToBase64 } from "@/utils";
import { useFormContext } from "react-hook-form";

interface ImageUploaderProps {
  name: string;
}

export default function ImageUploader({ name }: ImageUploaderProps) {
  const { getValues, setValue, watch } = useFormContext();

  const images = watch(name) || [];

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const existing = getValues(name) || [];

    const newImages = await Promise.all(
      files.map(async (file) => ({
        src: await convertToBase64(file),
        new: true,
      }))
    );

    setValue(name, [...existing, ...newImages].slice(0, 4));
  };

  const handleRemove = (index: number) => {
    const updated = [...getValues(name)];
    updated.splice(index, 1);
    setValue(name, updated);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Add Pictures{" "}
        <span className="text-muted-foreground text-xs">(optional)</span>
      </label>
      <div className="flex flex-wrap items-center gap-4">
        {images?.map((img: any, i: number) => (
          <div key={i} className="relative w-20 h-20">
            <Image
              src={img.src}
              alt="uploaded"
              fill
              className="object-cover rounded-md"
            />
            <button
              type="button"
              onClick={() => handleRemove(i)}
              className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
        {images?.length < 4 && (
          <div className="relative w-20 h-20 border border-dashed border-gray-300 rounded-md flex items-center justify-center">
            <input
              type="file"
              accept="image/*"
              multiple
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleUpload}
            />
            <span className="text-muted-foreground text-xl font-bold">+</span>
          </div>
        )}
      </div>
    </div>
  );
}
