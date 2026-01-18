// src/lib/consent/analytics.ts
"use client";

export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;

  return Boolean(window.CookieConsent?.acceptedCategory("analytics"));
}
