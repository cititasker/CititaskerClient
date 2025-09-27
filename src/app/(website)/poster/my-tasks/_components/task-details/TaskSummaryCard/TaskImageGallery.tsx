import React from "react";
import ImageGallery from "@/components/browseTask/Modals/ImageGalleryModal/ImageGallery";

export default function TaskImageGallery({ images }: { images?: string[] }) {
  if (!images?.length) return null;

  return (
    <div className="px-6 pb-4">
      <ImageGallery
        images={images}
        columns={4}
        aspectRatio="square"
        showCounter
        className="mb-4"
      />
    </div>
  );
}
