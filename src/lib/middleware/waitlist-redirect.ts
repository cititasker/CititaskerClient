// TEMPORARY PRODUCTION WAITLIST CONFIGURATION
// ================================================
// DELETE THIS FILE WHEN LAUNCHING THE APP
// ================================================

export const WAITLIST_CONFIG = {
  // Toggle to enable/disable waitlist redirect
  // Set to false when ready to launch
  ENABLED: true,

  // Your production domain
  PRODUCTION_DOMAIN: "cititasker.com",

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

/**
 * Determines if the current request should redirect to waitlist page
 * Only redirects in production environment
 */
export function shouldRedirectToWaitlist(
  hostname: string,
  pathname: string
): boolean {
  // Feature flag check - easy toggle
  if (!WAITLIST_CONFIG.ENABLED) {
    return false;
  }

  // Only redirect on production domain
  const isProduction = hostname.includes(WAITLIST_CONFIG.PRODUCTION_DOMAIN);
  if (!isProduction) {
    return false;
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
