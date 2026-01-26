/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_DOMAIN_URL || "https://cititasker.com",
  generateRobotsTxt: true,
  generateIndexSitemap: true, // For apps with many pages
  exclude: [
    "/poster/*",
    "/tasker/*",
    "/dashboard/*",
    "/wallet/*",
    "/settings/*",
    "/messages/*",
    "/notifications/*",
    "/admin/*",
    "/api/*",
    "/auth/callback/*",
    "/profile/*",
    "/server-sitemap-index.xml", // Exclude dynamic sitemap
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/poster/",
          "/tasker/",
          "/dashboard/",
          "/wallet/",
          "/settings/",
          "/messages/",
          "/notifications/",
          "/admin/",
          "/profile/edit",
          "/*?session=*",
          "/*?token=*",
          "/*?utm_*", // Exclude tracking URLs
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/poster/",
          "/tasker/",
          "/dashboard/",
          "/wallet/",
          "/settings/",
          "/messages/",
        ],
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_DOMAIN_URL || "https://cititasker.com"}/server-sitemap-index.xml`,
    ],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq based on path
    let priority = 0.7;
    let changefreq = "weekly";

    // Homepage - highest priority
    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    }
    // Important marketing pages
    else if (["/about", "/how-it-works"].includes(path)) {
      priority = 0.8;
      changefreq = "monthly";
    }
    // Auth pages
    else if (path.startsWith("/auth/")) {
      priority = 0.5;
      changefreq = "yearly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
