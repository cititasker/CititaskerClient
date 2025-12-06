import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";

export const ImageCard = ({
  image,
  index,
  onDelete,
}: {
  image: any;
  index: number;
  onDelete: () => void;
}) => (
  <div className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 hover:border-neutral-300 transition-all duration-300">
    <Image
      src={image.src}
      alt={`Portfolio image ${index + 1}`}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-105"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/40 transition-all duration-300" />

    {/* Delete Button */}
    <Button
      size="sm"
      variant="destructive"
      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8 p-0"
      onClick={onDelete}
      aria-label="Delete image"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  </div>
);
