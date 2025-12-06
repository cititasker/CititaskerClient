"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, Suspense } from "react";

const isDev = process.env.NODE_ENV === "development";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (isDev || initializedRef.current) return;

    import("posthog-js").then((posthogModule) => {
      const posthog = posthogModule.default;

      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        person_profiles: "identified_only",
        capture_pageview: false,
        loaded: (ph) => {
          ph.capture("$pageview", {
            $current_url: window.location.href,
          });
        },
      });

      initializedRef.current = true;
    });
  }, []);

  return (
    <>
      {!isDev && (
        <Suspense fallback={null}>
          <PostHogPageView />
        </Suspense>
      )}
      {children}
    </>
  );
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (isDev) return;

    const checkPostHog = () => {
      // @ts-expect-error - posthog is injected on window after dynamic import
      if (window.posthog) {
        let url = window.origin + pathname;

        if (searchParams.toString()) {
          url += "?" + searchParams.toString();
        }

        if (previousUrlRef.current !== url) {
          // @ts-expect-error - posthog capture is available only after load
          window.posthog.capture("$pageview", { $current_url: url });
          previousUrlRef.current = url;
        }
      }
    };

    const timer = setInterval(() => {
      // @ts-expect-error - window.posthog may not exist yet on first render
      if (window.posthog) {
        checkPostHog();
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [pathname, searchParams]);

  return null;
}
