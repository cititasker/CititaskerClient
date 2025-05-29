import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.API_BASE_URL || "staging-api.cititasker.com",
      },
    ],
  },
  async redirects() {
    if (process.env.NODE_ENV === "production") {
      return [
        {
          source: "/",
          destination: "/waitlist",
          permanent: false,
        },
      ];
    }
    return [];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
