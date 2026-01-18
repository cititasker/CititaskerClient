// providers/CookieConsentProvider.tsx
"use client";

import { useEffect } from "react";
import { initCookieConsent } from "@/app/cookie-consent";

export function CookieConsentProvider() {
  useEffect(() => {
    initCookieConsent();
  }, []);

  return null;
}
