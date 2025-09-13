import Empty from "@/components/myTasks/Empty";
import { useGetPorfolio } from "@/services/user/user.hook";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// Skeleton loader component
const PortfolioSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="h-[300px] rounded-30 overflow-hidden relative bg-neutral-200 animate-pulse"
        >
          <div className="w-full h-full bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-200 flex items-center justify-center">
            <div className="w-16 h-16 bg-neutral-300 rounded-lg animate-pulse delay-75"></div>
          </div>
          {/* Shimmer effect overlay */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
      ))}
    </div>
  );
};

const PortfolioItem = ({
  image,
  index,
}: {
  image: { src: string; key: string };
  index: number;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="h-[300px] rounded-30 overflow-hidden relative group bg-neutral-100">
      {/* Loading state */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-neutral-200 animate-pulse flex items-center justify-center">
          <div className="w-12 h-12 bg-neutral-300 rounded-lg animate-pulse"></div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-neutral-100 flex flex-col items-center justify-center text-center p-4">
          <div className="w-12 h-12 bg-neutral-300 rounded-lg mb-2 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-neutral-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-xs text-neutral-500">Failed to load</p>
        </div>
      )}

      {/* Actual image */}
      <Image
        src={image.src}
        alt={`Portfolio item ${index + 1}`}
        width={300}
        height={300}
        className={`w-full h-full object-cover transition-all duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } group-hover:scale-105`}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(false);
        }}
      />

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
        <div className="p-4 text-white w-full">
          <p className="text-sm font-medium">Portfolio Item {index + 1}</p>
        </div>
      </div>
    </div>
  );
};

interface IProps {
  id: any;
}

export default function Portfolio({ id }: IProps) {
  const [images, setImages] = useState<{ src: string; key: string }[]>([]);
  const { data, isLoading, isError } = useGetPorfolio({ id });

  const portfolio = data?.data?.portfolio || [];

  useEffect(() => {
    if (portfolio.length) {
      setImages(portfolio.map((src) => ({ src: src.url, key: src.key })));
    }
  }, [portfolio]);

  // Show skeleton while loading
  if (isLoading) {
    return <PortfolioSkeleton />;
  }

  // Show error state
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-1">
          Failed to load portfolio
        </h3>
        <p className="text-text-muted">Please try again later</p>
      </div>
    );
  }

  // Show empty state
  if (images.length === 0) {
    return <Empty text="No portfolio has been added" />;
  }

  return (
    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
      {images.map((img, index) => (
        <PortfolioItem key={img.key || index} image={img} index={index} />
      ))}
    </div>
  );
}
