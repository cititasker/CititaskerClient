"use client";

import React, { useEffect, useState } from "react";
import SelectedFile from "./SelectedFile";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface FilePreviewListProps {
  attachments: File[];
  onRemove: (index: number) => void;
}

export default function FilePreviewList({
  attachments,
  onRemove,
}: FilePreviewListProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [canScroll, setCanScroll] = useState({ prev: false, next: false });

  useEffect(() => {
    if (!api) return;

    const update = () =>
      setCanScroll({
        prev: api.canScrollPrev(),
        next: api.canScrollNext(),
      });

    update();
    api.on("select", update);

    return () => {
      api.off("select", update);
    };
  }, [api, attachments]);

  if (attachments.length === 0) return null;

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        {attachments.map((file, idx) => (
          <CarouselItem key={idx} className="basis-1/1 my-3">
            <SelectedFile file={file} onClick={() => onRemove(idx)} />
          </CarouselItem>
        ))}
      </CarouselContent>

      {canScroll.prev && (
        <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2" />
      )}
      {canScroll.next && (
        <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2" />
      )}
    </Carousel>
  );
}
