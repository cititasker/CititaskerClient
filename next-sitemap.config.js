// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_DOMAIN_URL || "https://cititasker.com",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
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
    "/browse-task/*",
    "/server-sitemap-index.xml",
    "/task-sitemap/*",
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
          "/*?utm_*",
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
    let priority = 0.7;
    let changefreq = "weekly";

    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    } else if (["/about", "/how-it-works", "/browse-task"].includes(path)) {
      priority = 0.8;
      changefreq = "monthly";
    } else if (path.startsWith("/auth/")) {
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
