import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.API_BASE_URL as string,
      },
    ],
  },
  async redirects() {
    if (process.env.NODE_ENV === "production") {
      return [
        {
          source: "/",
          destination: "https://www.cititasker.africa/waitlist",
          permanent: false,
        },
      ];
    }
    return [];
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

export default nextConfig;
