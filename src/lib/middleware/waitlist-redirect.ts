// lib/middleware/waitlist-redirect.ts
// 🚨 TEMPORARY PRODUCTION WAITLIST CONFIGURATION
// ================================================
// DELETE THIS FILE WHEN LAUNCHING THE APP
// ================================================

export const WAITLIST_CONFIG = {
  // Toggle to enable/disable waitlist redirect
  // Set to false when ready to launch
  ENABLED: true,

  // Only redirect in production environment
  // Staging, development, and local will NOT redirect
  PRODUCTION_ONLY: true,

  // Waitlist page path
  WAITLIST_PATH: "/waitlist",

  // Paths that should NOT redirect to waitlist
  EXCLUDED_PATHS: [
    "/waitlist",
    "/api",
    "/_next",
    "/images",
    "/fonts",
    "/icons",
    "/favicon.ico",
  ],

  // File extensions that should NOT redirect
  EXCLUDED_EXTENSIONS: [
    ".js",
    ".css",
    ".json",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
    ".ico",
    ".woff",
    ".woff2",
    ".ttf",
    ".eot",
    ".webp",
    ".mp4",
    ".webm",
  ],
} as const;

export function shouldRedirectToWaitlist(pathname: string): boolean {
  if (!WAITLIST_CONFIG.ENABLED) {
    return false;
  }

  // Environment check - only redirect in production
  if (WAITLIST_CONFIG.PRODUCTION_ONLY) {
    const isProduction = process.env.VERCEL_ENV === "production";

    if (!isProduction) {
      return false;
    }
  }

  // Don't redirect if already on waitlist page
  if (pathname === WAITLIST_CONFIG.WAITLIST_PATH) {
    return false;
  }

  // Don't redirect excluded paths (API, assets, etc.)
  const isExcludedPath = WAITLIST_CONFIG.EXCLUDED_PATHS.some((path) =>
    pathname.startsWith(path)
  );
  if (isExcludedPath) {
    return false;
  }

  // Don't redirect static assets by file extension
  const isStaticAsset = WAITLIST_CONFIG.EXCLUDED_EXTENSIONS.some((ext) =>
    pathname.toLowerCase().endsWith(ext)
  );
  if (isStaticAsset) {
    return false;
  }

  return true;
}

/**
 * Alternative: Use environment variable for more control
 * Add to .env.production: NEXT_PUBLIC_ENABLE_WAITLIST=true
 * Add to .env.development: NEXT_PUBLIC_ENABLE_WAITLIST=false
 */
export function shouldRedirectToWaitlistWithEnvVar(pathname: string): boolean {
  // Check environment variable
  const envEnabled = process.env.NEXT_PUBLIC_ENABLE_WAITLIST === "true";

  if (!WAITLIST_CONFIG.ENABLED || !envEnabled) {
    return false;
  }

  // Same checks as above...
  if (pathname === WAITLIST_CONFIG.WAITLIST_PATH) {
    return false;
  }

  const isExcludedPath = WAITLIST_CONFIG.EXCLUDED_PATHS.some((path) =>
    pathname.startsWith(path)
  );
  if (isExcludedPath) {
    return false;
  }

  const isStaticAsset = WAITLIST_CONFIG.EXCLUDED_EXTENSIONS.some((ext) =>
    pathname.toLowerCase().endsWith(ext)
  );
  if (isStaticAsset) {
    return false;
  }

  return true;
}
