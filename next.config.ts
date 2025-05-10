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
  // async redirects() {
  //   if (process.env.NODE_ENV === "production") {
  //     return [
  //       {
  //         source: "/",
  //         destination: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/waitlist`,
  //         permanent: false,

  //       },
  //     ];
  //   }
  //   return [];
  // },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

export default nextConfig;
