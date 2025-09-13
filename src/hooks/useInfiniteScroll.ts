import { useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
  hasNextPage: boolean;
  isFetching: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
}

export function useInfiniteScroll({
  hasNextPage,
  isFetching,
  onLoadMore,
  rootMargin = "200px",
}: UseInfiniteScrollProps) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = observerRef.current;
    if (!element || !hasNextPage || isFetching) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && onLoadMore(),
      { rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasNextPage, isFetching, onLoadMore, rootMargin]);

  return observerRef;
}
